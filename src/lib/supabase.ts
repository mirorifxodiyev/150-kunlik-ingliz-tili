import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { AppState } from "../types";
import { migrateState } from "../utils/storage";

const DEFAULT_SUPABASE_URL = "https://ztrghjuyybwwakmomkmw.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_jRXrtU53F0oi6lI15CeL7g_NwWUQXgA";

const envUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || "";
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || "";

const rawUrl = (
  envUrl && !envUrl.includes("your-project-id") ? envUrl : DEFAULT_SUPABASE_URL
)
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");

const rawKey =
  envKey && envKey !== "your-supabase-anon-public-key"
    ? envKey
    : DEFAULT_SUPABASE_PUBLISHABLE_KEY;

const isValidSupabaseEnv =
  rawUrl.startsWith("https://") &&
  !rawUrl.includes("your-project-id") &&
  rawKey.length > 20 &&
  rawKey !== "your-supabase-anon-public-key";

export const supabase: SupabaseClient | null = isValidSupabaseEnv
  ? createClient(rawUrl, rawKey)
  : null;

export const LAST_SYNC_AT_STORAGE = "eng150_last_sync_at";

export const SUPABASE_SQL_SETUP_SCRIPT = `-- Sizning Supabase loyihangizdagi public.user_progress jadvali tuzilmasi:

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);`;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabase);
}

export function getLastSyncTimestamp(): string | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage.getItem(LAST_SYNC_AT_STORAGE);
}

function recordLastSyncTimestamp(iso: string) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(LAST_SYNC_AT_STORAGE, iso);
  } catch {
    // ignore
  }
}

export async function getCurrentSupabaseUser(): Promise<User | null> {
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getUser();
    return data.user ?? null;
  } catch {
    return null;
  }
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<{ user: User | null; needsEmailConfirmation?: boolean; error?: string }> {
  if (!supabase) {
    return {
      user: null,
      error: "VITE_SUPABASE_URL va VITE_SUPABASE_ANON_KEY muhit o'zgaruvchilari (Secrets) kiritilmagan.",
    };
  }
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { user: null, error: error.message };
  }
  return {
    user: data.user,
    needsEmailConfirmation: Boolean(data.user && !data.session),
  };
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: User | null; error?: string }> {
  if (!supabase) {
    return {
      user: null,
      error: "VITE_SUPABASE_URL va VITE_SUPABASE_ANON_KEY muhit o'zgaruvchilari (Secrets) kiritilmagan.",
    };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { user: null, error: error.message };
  }
  return { user: data.user };
}

export async function signOutSupabase(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function saveProgressToSupabase(
  state: AppState
): Promise<{ ok: boolean; syncedAt?: string; error?: string }> {
  if (!supabase) {
    return { ok: false, error: "Supabase ulanmagan (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY yo'q)" };
  }

  try {
    const user = await getCurrentSupabaseUser();
    if (!user?.id) {
      return {
        ok: false,
        error: "Bulutga saqlash uchun avval Email va parolingiz bilan tizimga kiring yoki ro'yxatdan o'ting.",
      };
    }

    const nowIso = new Date().toISOString();

    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: user.id,
        data: state,
        updated_at: nowIso,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      return { ok: false, error: error.message };
    }

    recordLastSyncTimestamp(nowIso);
    return { ok: true, syncedAt: nowIso };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Noma'lum xatolik" };
  }
}

export async function loadProgressFromSupabase(): Promise<{
  ok: boolean;
  state?: AppState;
  updatedAt?: string;
  error?: string;
}> {
  if (!supabase) {
    return { ok: false, error: "Supabase ulanmagan (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY yo'q)" };
  }

  try {
    const user = await getCurrentSupabaseUser();
    if (!user?.id) {
      return {
        ok: false,
        error: "Bulutdan yuklash uchun avval Email va parolingiz bilan tizimga kiring.",
      };
    }

    const { data: row, error } = await supabase
      .from("user_progress")
      .select("data, updated_at")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      return { ok: false, error: error.message };
    }

    if (!row || !row.data) {
      return {
        ok: false,
        error: "Sizning hisobingiz bo'yicha user_progress jadvalida hali ma'lumot topilmadi.",
      };
    }

    const migrated = migrateState(row.data);
    if (row.updated_at) {
      recordLastSyncTimestamp(row.updated_at);
    }

    return {
      ok: true,
      state: migrated,
      updatedAt: row.updated_at,
    };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Noma'lum xatolik" };
  }
}

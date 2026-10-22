import { CURRICULUM, TESTS } from "../data";
import { AppState } from "../types";

export function generateStandaloneHtml(state: AppState): string {
  const stateJson = JSON.stringify(state);
  const curriculumJson = JSON.stringify(CURRICULUM);
  const testsJson = JSON.stringify(TESTS);

  return `<!doctype html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>150-Kunlik Amerika Ingliz Tili Platformasi (Oflayn Standalone)</title>
  <style>
    :root {
      --bg-base: #f8fafc;
      --bg-surface: #ffffff;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border-color: #e2e8f0;
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --success: #16a34a;
      --error: #dc2626;
    }
    body.dark {
      --bg-base: #0f172a;
      --bg-surface: #1e293b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-color: #334155;
      --primary: #38bdf8;
      --primary-hover: #0284c7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background-color: var(--bg-base); color: var(--text-main); min-height: 100vh; display: flex; flex-direction: column; }
    header { background-color: var(--bg-surface); border-bottom: 1px solid var(--border-color); padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.15rem; font-weight: 700; color: var(--primary); }
    main { max-width: 1100px; margin: 1.5rem auto; padding: 0 1rem; width: 100%; flex: 1; }
    .card { background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; border: none; text-decoration: none; }
    .btn-primary { background-color: var(--primary); color: white; }
    .btn-primary:hover { background-color: var(--primary-hover); }
    .btn-secondary { background-color: transparent; border: 1px solid var(--border-color); color: var(--text-main); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
    .vocab-card { border: 1px solid var(--border-color); padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; background: var(--bg-surface); }
    .vocab-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem; }
    .vocab-en { font-size: 1.1rem; font-weight: 700; }
    .vocab-uz { color: var(--primary); font-weight: 600; }
    .vocab-ipa { font-size: 0.8rem; color: var(--text-muted); }
    .vocab-example { font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem; }
  </style>
</head>
<body>
  <header>
    <div class="logo">150-Kunlik Ingliz Tili Platformasi</div>
    <div style="display:flex;gap:0.5rem;align-items:center;">
      <button class="btn btn-secondary" onclick="document.body.classList.toggle('dark')">Rejim</button>
      <button class="btn btn-primary" onclick="exportData()">Zaxira yuklab olish</button>
    </div>
  </header>
  <main id="app">
    <div class="card">
      <h1 style="font-size:1.5rem;margin-bottom:0.5rem;">Oflayn Ishchi Platforma</h1>
      <p style="color:var(--text-muted);margin-bottom:1rem;">Ushbu bitta mustaqil HTML fayli barcha 150 kunlik darslarni, lug'atlarni va testlarni o'z ichiga olgan bo'lib, internetsiz ham to'liq ishlaydi.</p>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem;" id="monthTabs"></div>
      <div id="lessonsGrid" class="grid"></div>
    </div>
    <div id="lessonView" class="card" style="display:none;"></div>
  </main>
  <script>
    const CURRICULUM = ${curriculumJson};
    const TESTS = ${testsJson};
    let state = ${stateJson};

    function speak(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        window.speechSynthesis.speak(u);
      } else {
        alert("Brauzeringizda Web Speech API mavjud emas.");
      }
    }

    let currentMonth = 1;
    function renderTabs() {
      const container = document.getElementById('monthTabs');
      container.innerHTML = [1,2,3,4,5].map(m => 
        \`<button class="btn \${m === currentMonth ? 'btn-primary' : 'btn-secondary'}" onclick="setMonth(\${m})">\${m}-oy</button>\`
      ).join('');
    }

    function setMonth(m) {
      currentMonth = m;
      renderTabs();
      renderGrid();
      document.getElementById('lessonView').style.display = 'none';
    }

    function renderGrid() {
      const grid = document.getElementById('lessonsGrid');
      const lessons = CURRICULUM.filter(l => l.month === currentMonth);
      grid.innerHTML = lessons.map(l => \`
        <div class="card" style="margin:0;cursor:pointer;" onclick="viewLesson('\${l.id}')">
          <div style="font-size:0.8rem;color:var(--primary);font-weight:700;">\${l.level} · \${l.day}-kun</div>
          <div style="font-size:1rem;font-weight:700;margin:0.25rem 0;">\${l.title}</div>
          <div style="font-size:0.85rem;color:var(--text-muted);">\${l.themeUz}</div>
        </div>
      \`).join('');
    }

    function viewLesson(id) {
      const l = CURRICULUM.find(x => x.id === id);
      if (!l) return;
      const v = document.getElementById('lessonView');
      v.style.display = 'block';
      if (!l.isReady) {
        v.innerHTML = \`
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <div>
              <div style="font-size:0.8rem;color:var(--primary);font-weight:700;">\${l.month}-oy · \${l.day}-kun (\${l.level})</div>
              <h2 style="font-size:1.3rem;">\${l.title}</h2>
            </div>
            <button class="btn btn-secondary" onclick="document.getElementById('lessonView').style.display='none'">Yopish</button>
          </div>
          <p style="color:var(--text-muted);">Bu dars hali tayyor emas.</p>
        \`;
        v.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      v.innerHTML = \`
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <div>
            <div style="font-size:0.8rem;color:var(--primary);font-weight:700;">\${l.month}-oy · \${l.day}-kun (\${l.level})</div>
            <h2 style="font-size:1.3rem;">\${l.title}</h2>
          </div>
          <button class="btn btn-secondary" onclick="document.getElementById('lessonView').style.display='none'">Yopish</button>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem;">1-soat: Lug'at (Audio bilan)</h3>
          \${l.vocabulary.map(voc => \`
            <div class="vocab-card">
              <div class="vocab-header">
                <div>
                  <span class="vocab-en">\${voc.en}</span>
                  <span class="vocab-ipa">/\${voc.ipaOrRespelling}/</span>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="speak('\${voc.en.replace(/'/g, "\\\\'")}')">Tinglash 🔊</button>
              </div>
              <div class="vocab-uz">\${voc.uz}</div>
              <div class="vocab-example">\${voc.example} — <em>\${voc.exampleUz}</em></div>
            </div>
          \`).join('')}
        </div>

        <div style="margin-bottom:1.5rem;">
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem;">2-soat: Grammatika</h3>
          <p style="margin-bottom:0.75rem;">\${l.grammar.explanationUz}</p>
          <div style="background:var(--bg-base);padding:1rem;border-radius:8px;">
            \${l.grammar.examples.map(ex => \`
              <div style="margin-bottom:0.5rem;"><strong>\${ex.en}</strong> — \${ex.uz}</div>
            \`).join('')}
          </div>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem;">3-soat: Amaliy Muloqot</h3>
          <div style="background:var(--bg-base);padding:1rem;border-radius:8px;">
            \${l.dialogue.lines.map(line => \`
              <div style="margin-bottom:0.5rem;"><strong>\${line.speaker}:</strong> \${line.en} <br/><span style="color:var(--text-muted);font-size:0.85rem;">\${line.uz}</span></div>
            \`).join('')}
          </div>
        </div>
      \`;
      v.scrollIntoView({ behavior: 'smooth' });
    }

    function exportData() {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'eng150_progress_backup.json';
      a.click();
    }

    renderTabs();
    renderGrid();
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtmlFile(state: AppState): void {
  const htmlContent = generateStandaloneHtml(state);
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "150-kunlik-ingliz-tili-offline.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

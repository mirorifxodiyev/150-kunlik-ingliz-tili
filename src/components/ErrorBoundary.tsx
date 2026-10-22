import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";
import { STORAGE_KEY } from "../utils/storage";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled render error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndReload = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h1 className="text-xl font-bold text-white mb-2">
              Platformani yuklashda xatolik yuz berdi
            </h1>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Brauzer xotirasi yoki ulanishda vaqtinchalik muammo aniqlandi. Quyidagi tugmalar orqali platformani tiklashingiz mumkin:
            </p>

            {this.state.error && (
              <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-rose-300 mb-5 overflow-auto max-h-32 border border-slate-800">
                {this.state.error.toString()}
              </div>
            )}

            <div className="space-y-2.5">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-colors shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Sahifani qayta yuklash
              </button>

              <button
                onClick={this.handleResetAndReload}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-slate-400" />
                Keshni tozalash va qayta ishga tushirish
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

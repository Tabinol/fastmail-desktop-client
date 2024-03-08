import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface AppInfo {
    name: string;
    description: string;
    version: string;
    license: string;
    bugUrl: string;
  }

  interface SpellCheckInfo {
    enabled: boolean;
    availableLanguages: { [key: string]: string } | undefined;
    languages: string[];
  }

  interface Api {
    getAppInfo: Promise<AppInfo>;
    getTheme: Promise<string>;
    setTheme: (theme: string) => void;
    setThemeReply: (callback: (theme: string) => void) => IpcRenderer;
    getSpellCheck: Promise<SpellCheckInfo>;
    setSpellCheck: (spellCheckInfo: SpellCheckInfo) => void;
  }

  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
}

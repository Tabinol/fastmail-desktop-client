import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Api {
    appName: Promise<string>;
    appVersion: Promise<string>;
    availableSpellCheckerLanguages: Promise<{ [key: string]: string }>;
    getTheme: Promise<string>;
    setTheme: (theme: string) => void;
    setThemeReply: (callback: (theme: string) => void) => IpcRenderer;
  }

  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
}

import { electronAPI } from '@electron-toolkit/preload';
import { IpcRenderer, contextBridge, ipcRenderer } from 'electron/renderer';

// Custom APIs for renderer
const api = {
  appName: ipcRenderer.invoke('appName') as Promise<string>,
  appVersion: ipcRenderer.invoke('appVersion') as Promise<string>,
  availableSpellCheckerLanguages: ipcRenderer.invoke('availableSpellCheckerLanguages') as Promise<{
    [key: string]: string;
  }>,
  getTheme: ipcRenderer.invoke('getTheme') as Promise<string>,
  setTheme: (theme: string): void => ipcRenderer.send('setTheme', theme),
  setThemeReply: (callback: (theme: string) => void): IpcRenderer =>
    ipcRenderer.on('setThemeReply', (_event, theme) => callback(theme))
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI;
  // @ts-expect-error (define in dts)
  window.api = api;
}

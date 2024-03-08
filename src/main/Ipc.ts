import { Session } from 'electron';
import { app, ipcMain } from 'electron/main';

import LocalStore from './LocalStore';
import { getCodeToNameSortByName } from './locales';

export default class Ipc {
  constructor(
    private localStore: LocalStore,
    private session: Session
  ) {}

  create(): this {
    ipcMain.handle('appName', () => app.getName());
    ipcMain.handle('appVersion', () => app.getVersion());
    ipcMain.handle('availableSpellCheckerLanguages', () => getCodeToNameSortByName(this.session));
    ipcMain.handle('getTheme', () => this.localStore.loadTheme());
    ipcMain.on('setTheme', (event, theme) => {
      this.localStore.saveTheme(theme);
      event.reply('setThemeReply', theme);
    });

    return this;
  }
}

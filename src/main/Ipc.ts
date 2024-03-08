import { Session } from 'electron';
import { ipcMain } from 'electron/main';

import packageJson from '../../package.json';
import LocalStore from './LocalStore';
import { getCodeToNameSortByName } from './locales';

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

export default class Ipc {
  constructor(
    private localStore: LocalStore,
    private session: Session
  ) {}

  create(): this {
    ipcMain.handle('getAppInfo', () => this.getAppInfo());
    ipcMain.handle('getTheme', () => this.localStore.loadTheme());
    ipcMain.on('setTheme', (event, theme) => {
      this.localStore.saveTheme(theme);
      event.reply('setThemeReply', theme);
    });
    ipcMain.handle(
      'getSpellCheck',
      (): SpellCheckInfo => ({
        enabled: this.session.spellCheckerEnabled,
        availableLanguages: getCodeToNameSortByName(this.session),
        languages: this.session.getSpellCheckerLanguages()
      })
    );
    ipcMain.on('setSpellCheck', (_event, spellCheckInfo: SpellCheckInfo) => {
      this.session.setSpellCheckerEnabled(spellCheckInfo.enabled);
      if (spellCheckInfo.enabled) {
        this.session.setSpellCheckerLanguages(spellCheckInfo.languages);
      }
    });
    return this;
  }

  private getAppInfo(): AppInfo {
    return {
      name: packageJson.name,
      description: packageJson.description,
      version: packageJson.version,
      license: packageJson.license,
      bugUrl: packageJson.bugs.url
    };
  }
}

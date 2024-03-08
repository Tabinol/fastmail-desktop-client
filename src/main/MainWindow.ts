import { BrowserWindow, MessageBoxSyncOptions, Session, dialog, shell } from 'electron';

import ContextMenu from './ContextMenu';
import Ipc from './Ipc';
import LocalStore from './LocalStore';
import MainMenu from './MainMenu';
import { FASTMAIL_SVG } from './common';

const APP_URL = 'https://app.fastmail.com/';

export default class MainWindow {
  private localStore = new LocalStore();
  private win?: BrowserWindow;

  create(): this {
    const win = (this.win = new BrowserWindow({
      ...(process.platform === 'linux' ? { icon: FASTMAIL_SVG } : {}),
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        sandbox: true,
        spellcheck: true
      }
    }));

    new Ipc(this.localStore, win.webContents.session).create();

    this.setBounds();

    // Click to external browser
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.includes('fastmail.com')) {
        return { action: 'allow' };
      }

      shell.openExternal(url);
      return { action: 'deny' };
    });

    win.once('ready-to-show', win.show);

    new MainMenu().create();
    new ContextMenu(win).create();

    win.loadURL(APP_URL);

    win.on('close', () => {
      this.saveBounds();
    });

    win.webContents.on('will-prevent-unload', (event) => {
      const options: MessageBoxSyncOptions = {
        title: 'Fastmail: Changes not saved',
        type: 'question',
        buttons: ['Cancel', 'Leave'],
        message: 'Do you want to leave Fastmail?',
        detail: 'Changes you made may not be saved.'
      };

      const response = dialog.showMessageBoxSync(win, options);

      if (response === 1) {
        event.preventDefault();
      }
    });

    return this;
  }

  getSession(): Session {
    return this.win!.webContents.session;
  }

  restoreAndFocus(): void {
    if (this.win) {
      if (this.win.isMinimized()) {
        this.win.restore();
      }

      this.win.focus();
    }
  }

  private setBounds(): void {
    if (this.win) {
      const bounds = this.localStore.loadBounds();
      if (bounds) {
        this.win.setBounds(bounds);
      }
    }
  }

  private saveBounds(): void {
    if (this.win) {
      const bounds = this.win.getBounds();
      this.localStore.saveBounds(bounds);
    }
  }
}

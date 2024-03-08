import { is } from '@electron-toolkit/utils';
import { BrowserWindow, shell } from 'electron';
import { createFileRoute, createURLRoute } from 'electron-router-dom';
import path from 'path';

import { FASTMAIL_SVG } from './common';

export default abstract class AbstractWindow {
  private win?: BrowserWindow;

  protected constructor(
    private id: string,
    private title: string,
    private width: number,
    private height: number
  ) {}

  createIfNotExist(): this {
    if (!this.win) {
      this.create();
    } else {
      this.win.focus();
    }

    return this;
  }

  private create(): void {
    const win = (this.win = new BrowserWindow({
      ...(process.platform === 'linux' ? { icon: FASTMAIL_SVG } : {}),
      width: this.width,
      height: this.height,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    }));

    win.setMenuBarVisibility(false);

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win.loadURL(createURLRoute(process.env['ELECTRON_RENDERER_URL'], this.id));
    } else {
      win.loadFile(...createFileRoute(path.join(__dirname, '../renderer/index.html'), this.id));
    }

    // Click to external browser
    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    win.once('ready-to-show', () => {
      win.show();
      // Don't know why the title is working only after the window pop.
      win.setTitle(this.title);
    });

    win.on('close', () => {
      this.win = undefined;
    });
  }
}

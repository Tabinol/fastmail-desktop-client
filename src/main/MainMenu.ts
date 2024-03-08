import { Menu, MenuItemConstructorOptions } from 'electron';

import AboutWindow from './AboutWindow';
import SettingsWindow from './SettingsWindow';

export default class MainMenu {
  private settingsWindow = new SettingsWindow();
  private aboutWindow = new AboutWindow();

  create(): this {
    const template: MenuItemConstructorOptions[] = [
      { role: 'fileMenu' },
      { role: 'editMenu' },
      { role: 'viewMenu' },
      { role: 'windowMenu' },
      {
        role: 'help',
        submenu: [
          {
            label: 'Settings',
            click: (): void => {
              this.settingsWindow.createIfNotExist();
            }
          },
          {
            label: 'About...',
            click: (): void => {
              this.aboutWindow.createIfNotExist();
            }
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return this;
  }

  refresh(): this {
    return this.create();
  }
}

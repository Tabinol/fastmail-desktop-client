import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import openAboutWindow from "electron-about-window";
import path from 'path';
import SpellCheckerMenu from "./SpellCheckerMenu";
import { PROJECT_ROOT_DIR, RESOURCES_PATH } from "./utils";

export default class MainMenu {

    constructor(private win: BrowserWindow) { }

    create(): MainMenu {
        const template: MenuItemConstructorOptions[] = [
            { role: 'fileMenu' },
            { role: 'editMenu' },
            { role: 'viewMenu' },
            { role: 'windowMenu' },
            {
                label: 'Spell Checker',
                submenu: new SpellCheckerMenu(this.win, this).menuItemConstructorOptions()
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'about...',
                        click: () => {
                            openAboutWindow({
                                icon_path: path.join(RESOURCES_PATH, 'icon.png'),
                                package_json_dir: PROJECT_ROOT_DIR,
                                product_name: 'Fastmail Desktop Client'
                            });
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        return this;
    }

    refresh(): MainMenu {
        return this.create();
    }
}

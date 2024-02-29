import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import openAboutWindow from "electron-about-window";
import SpellCheckerMenu from "./SpellCheckerMenu";
import { FASTMAIL_SVG, PROJECT_ROOT_DIR } from "./common";

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
                                icon_path: FASTMAIL_SVG,
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

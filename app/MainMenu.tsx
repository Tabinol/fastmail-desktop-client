import { Menu, MenuItemConstructorOptions } from "electron";
import openAboutWindow from "electron-about-window";
import path from 'path';
import { PROJECT_ROOT_DIR, RESOURCES_PATH } from "./utils";

export default class MainMenu {

    private menu!: Menu;

    create(): MainMenu {
        const template: MenuItemConstructorOptions[] = [
            { role: 'fileMenu' },
            { role: 'editMenu' },
            { role: 'viewMenu' },
            { role: 'windowMenu' },
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

        this.menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(this.menu);

        return this;
    }
}

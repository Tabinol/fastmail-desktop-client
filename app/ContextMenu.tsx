import { BrowserWindow, ContextMenuParams, Menu, MenuItemConstructorOptions, clipboard } from "electron";
import MainMenu from "./MainMenu";
import SpellCheckerMenu from "./SpellCheckerMenu";

export default class ContextMenu {

    constructor(private win: BrowserWindow, private mainMenu: MainMenu) { }

    create(): ContextMenu {

        this.win.webContents.on('context-menu', (event, params) => {
            const menu = Menu.buildFromTemplate(this.buildMenu(params));
            menu.popup();
        });

        return this;
    }

    private buildMenu(params: ContextMenuParams): MenuItemConstructorOptions[] {
        return [
            ...new SpellCheckerMenu(this.win as BrowserWindow, this.mainMenu, params).menuItemConstructorOptions(),
            { type: 'separator' },
            {
                role: 'cut',
                visible: this.isEditable(params),
                enabled: this.isSelection(params)
            },
            {
                role: 'copy',
                enabled: this.isSelection(params)
            },
            {
                role: 'paste',
                visible: this.isEditable(params),
                enabled: this.isClipboardNotEmpty()
            }
        ];
    }

    private isSelection(params: ContextMenuParams): boolean {
        return params.selectionText.length > 0;
    }

    private isEditable(params: ContextMenuParams): boolean {
        return params.isEditable;
    }

    private isClipboardNotEmpty(): boolean {
        return clipboard.readText().length > 0;
    }
}

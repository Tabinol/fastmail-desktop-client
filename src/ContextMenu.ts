import { BrowserWindow, Menu, MenuItem } from "electron";

export class ContextMenu {
    menu = new Menu();

    win: BrowserWindow;
    event: any;
    params: Electron.ContextMenuParams;

    constructor(win: BrowserWindow, event: any, params: Electron.ContextMenuParams) {
        this.win = win;
        this.event = event;
        this.params = params;
    }

    create() {
        // Add each spelling suggestion
        for (const suggestion of this.params.dictionarySuggestions) {
            this.menu.append(new MenuItem({
                label: suggestion,
                click: () => this.win.webContents.replaceMisspelling(suggestion)
            }));
        }

        // Allow users to add the misspelled word to the dictionary
        if (this.params.misspelledWord) {
            this.menu.append(
                new MenuItem({
                    label: 'Add to dictionary',
                    click: () => this.win.webContents.session.addWordToSpellCheckerDictionary(this.params.misspelledWord)
                })
            );
        }

        this.menu.popup();
    }
}
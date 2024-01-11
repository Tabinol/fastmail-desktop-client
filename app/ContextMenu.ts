import { BrowserWindow, ContextMenuParams, Menu, MenuItem } from "electron";

export default class ContextMenu {
    private menu = new Menu();

    private win: BrowserWindow;
    private params: ContextMenuParams;

    constructor(win: BrowserWindow, params: ContextMenuParams) {
        this.win = win;
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

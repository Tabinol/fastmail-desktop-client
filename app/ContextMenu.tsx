import { BrowserWindow, ContextMenuParams, Menu, MenuItem } from "electron";

export default class ContextMenu {
    private menu = new Menu();

    constructor(private win: BrowserWindow, private params: ContextMenuParams) { }

    create(): ContextMenu {
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

        return this;
    }
}

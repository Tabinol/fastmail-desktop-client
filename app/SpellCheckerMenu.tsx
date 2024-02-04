import { BrowserWindow, ContextMenuParams, MenuItemConstructorOptions, Session } from "electron";
import MainMenu from "./MainMenu";

export default class SpellCheckerMenu {

    private session: Session;

    constructor(private win: BrowserWindow, private mainMenu: MainMenu, private params?: ContextMenuParams) {
        this.session = this.win.webContents.session;
    }

    menuItemConstructorOptions(): MenuItemConstructorOptions[] {

        return [
            ...typeof this.params !== 'undefined' ? [
                ...this.generateDictionarySuggestions(),
                ...this.generateMisspelledWords(),
                { type: 'separator' } as MenuItemConstructorOptions
            ] : [],
            { role: 'toggleSpellChecker' },
            {
                label: 'Active Languages',
                submenu: this.generateActiveLanguageMenu()
            }
        ];
    }

    private generateDictionarySuggestions(): MenuItemConstructorOptions[] {
        return this.params!.dictionarySuggestions.map(suggestion => ({
            label: suggestion,
            click: () => this.win.webContents.replaceMisspelling(suggestion)
        }));
    }

    private generateMisspelledWords(): MenuItemConstructorOptions[] {
        return this.params!.misspelledWord ? [{
            label: 'Add to dictionary',
            click: () => this.session.addWordToSpellCheckerDictionary(this.params!.misspelledWord)
        }] : [];
    }

    private generateActiveLanguageMenu(): MenuItemConstructorOptions[] {
        const result: MenuItemConstructorOptions[] = [];
        const spellCheckerLanguages = this.session.getSpellCheckerLanguages();

        this.session.availableSpellCheckerLanguages.forEach(lang => {
            result.push({
                label: lang,
                type: 'checkbox',
                checked: spellCheckerLanguages.includes(lang),
                click: () => {
                    this.session.setSpellCheckerLanguages(spellCheckerLanguages.concat(lang));
                    this.mainMenu.refresh();
                }
            });
        });

        return result;
    }
}

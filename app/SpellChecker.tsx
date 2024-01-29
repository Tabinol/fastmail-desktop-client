import { MenuItemConstructorOptions, Session } from "electron";

export default class SpellChecker {

    constructor(private session: Session) { }

    getLanguageSubmenu(): MenuItemConstructorOptions {
        return {
            label: 'Active Languages',
            submenu: this.generateActiveLanguageMenu()
        };
    }

    private generateActiveLanguageMenu(): MenuItemConstructorOptions[] {
        const result: MenuItemConstructorOptions[] = [];
        const spellCheckerLanguages = this.session.getSpellCheckerLanguages();

        this.session.availableSpellCheckerLanguages.forEach(lang => {
            result.push({
                label: lang,
                type: 'checkbox',
                checked: spellCheckerLanguages.includes(lang)
            });
        });

        return result;
    }
}

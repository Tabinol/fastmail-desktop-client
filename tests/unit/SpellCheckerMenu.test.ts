import { describe, expect, it } from '@jest/globals';
import { MenuItemConstructorOptions } from 'electron';
import SpellCheckerMenu from '../../electron/SpellCheckerMenu';

const mockSession = jest.fn().mockImplementation(() => {
    return {
        availableSpellCheckerLanguages: ['en', 'es', 'fr'],
        getSpellCheckerLanguages: jest.fn(() => ['en', 'fr'])
    };
});

const mockWebContents = jest.fn().mockImplementation(() => {
    return {
        session: new mockSession()
    };
});

const mockBrowserWindow = jest.fn().mockImplementation(() => {
    return {
        webContents: new mockWebContents()
    };
});

const mockMainMenu = jest.fn().mockImplementation();

const spellCheckerMenu = new SpellCheckerMenu(new mockBrowserWindow(), new mockMainMenu());

describe('getLanguageSubmenu', () => {
    const languageSubmenu = spellCheckerMenu.menuItemConstructorOptions()[1].submenu as MenuItemConstructorOptions[];

    it('submenu count 3 languages', () => {
        expect(languageSubmenu.length).toEqual(3);
    });

    it('"en" should be active', () => {
        expect(findMenuItemByLanguage(languageSubmenu, 'en').checked).toBe(true);
    });

    it('"es" should be inactive', () => {
        expect(findMenuItemByLanguage(languageSubmenu, 'es').checked).toBe(false);
    });
});

function findMenuItemByLanguage(languageSubmenu: MenuItemConstructorOptions[], lang: string): MenuItemConstructorOptions {
    for (const entry of languageSubmenu) {
        if (entry.label === lang) {
            return entry;
        }
    }
    throw console.error(`Language not found: ${lang}`);
}

import { describe, expect, it } from '@jest/globals';
import { MenuItemConstructorOptions } from 'electron';
import SpellChecker from '../../app/SpellChecker';

const mockSession = jest.fn().mockImplementation(() => {
    return {
        availableSpellCheckerLanguages: ['en', 'es', 'fr'],
        getSpellCheckerLanguages: jest.fn(() => ['en', 'fr'])
    };
});

const spellChecker = new SpellChecker(new mockSession());

describe('getLanguageSubmenu', () => {
    const languageSubmenu = spellChecker.getLanguageSubmenu().submenu as MenuItemConstructorOptions[];

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

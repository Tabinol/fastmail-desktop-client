import { BrowserWindow, ContextMenuParams, MenuItemConstructorOptions, Session } from 'electron';

export default class SpellCheckerMenu {
  private session: Session;

  constructor(
    private win: BrowserWindow,
    private params: ContextMenuParams
  ) {
    this.session = this.win.webContents.session;
  }

  menuItemConstructorOptions(): MenuItemConstructorOptions[] {
    return [
      ...this.generateDictionarySuggestions(),
      ...this.generateMisspelledWords(),
      { type: 'separator' } as MenuItemConstructorOptions,
      { role: 'toggleSpellChecker' }
    ];
  }

  private generateDictionarySuggestions(): MenuItemConstructorOptions[] {
    return this.params!.dictionarySuggestions.map((suggestion) => ({
      label: suggestion,
      click: (): void => {
        this.win.webContents.replaceMisspelling(suggestion);
      }
    }));
  }

  private generateMisspelledWords(): MenuItemConstructorOptions[] {
    return this.params!.misspelledWord
      ? [
          {
            label: 'Add to dictionary',
            click: () => this.session.addWordToSpellCheckerDictionary(this.params!.misspelledWord)
          }
        ]
      : [];
  }
}

import { Session } from 'electron';

import locales from './locales.json';

function getCodeToNameSortByName(session: Session): { [key: string]: string } {
  return Object.fromEntries(
    session.availableSpellCheckerLanguages
      .map((lang) => {
        return [lang, locales[lang]?.['name'] ?? lang];
      })
      .sort((a, b) => (a[1] < b[1] ? -1 : 1))
  );
}

export { getCodeToNameSortByName };

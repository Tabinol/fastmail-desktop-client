import { getCodeToNameSortByName } from '../../src/main/locales';

const mockSession = jest.fn().mockImplementation(() => {
  return {
    availableSpellCheckerLanguages: ['en-US', 'fr-FR', 'xx-XX']
  };
});

describe('getCodeToNameSortByName', () => {
  const codeToNameSortByName = getCodeToNameSortByName(new mockSession());

  it('should count 3 languages', () => {
    expect(Object.keys(codeToNameSortByName).length).toEqual(3);
  });

  it('"en_US" should be named "English (United States)"', () => {
    expect(codeToNameSortByName['en-US']).toMatch(/English \(United States\)/);
  });

  it('"xx_XX" should be named "xx_XX"', () => {
    expect(codeToNameSortByName['xx-XX']).toMatch(/xx-XX/);
  });
});

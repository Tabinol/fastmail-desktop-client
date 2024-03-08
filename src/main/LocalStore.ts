import Store from 'electron-store';

const WIN_BOUNDS_KEY = 'winBounds';
const THEME_KEY = 'theme';

export default class LocalStore {
  private store = new Store();

  loadBounds(): Partial<Electron.Rectangle> | undefined {
    return this.store.get(WIN_BOUNDS_KEY) as Partial<Electron.Rectangle> | undefined;
  }

  saveBounds(bounds: Partial<Electron.Rectangle>): void {
    this.store.set(WIN_BOUNDS_KEY, bounds);
  }

  loadTheme(): string | undefined {
    return this.store.get(THEME_KEY) as string | undefined;
  }

  saveTheme(theme: string): void {
    this.store.set(THEME_KEY, theme);
  }
}

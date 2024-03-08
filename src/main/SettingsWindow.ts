import AbstractWindow from './AbstractWindow';

export default class SettingsWindow extends AbstractWindow {
  constructor() {
    super('settings', 'Settings', 800, 600);
  }
}

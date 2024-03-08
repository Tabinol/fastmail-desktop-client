import AbstractWindow from './AbstractWindow';

export default class SettingsWindow extends AbstractWindow {
  constructor() {
    super('settings', 'Settings', 640, 580);
  }
}

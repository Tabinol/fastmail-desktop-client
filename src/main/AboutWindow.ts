import AbstractWindow from './AbstractWindow';

export default class AboutWindow extends AbstractWindow {
  constructor() {
    super('about', 'About...', 600, 490);
  }
}

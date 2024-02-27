import { BrowserWindow, MessageBoxSyncOptions, dialog, shell } from "electron";
import Store from "electron-store";
import ContextMenu from "./ContextMenu";
import MainMenu from "./MainMenu";

const APP_URL = "https://app.fastmail.com/";
const WIN_BOUNDS_KEY = "winBounds";

export default class MainWindow {

    private store = new Store();
    private win?: BrowserWindow;

    create(): MainWindow {
        const win = this.win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false,
            autoHideMenuBar: true,
            webPreferences: {
                spellcheck: true
            }
        });

        this.setBounds();

        // Click to external browser
        win.webContents.setWindowOpenHandler(({ url }) => {

            if (url.includes("fastmail.com")) {
                return { action: 'allow' };
            }

            shell.openExternal(url);
            return { action: 'deny' };
        });

        win.once('ready-to-show', win.show);

        const mainMenu = new MainMenu(win).create();
        new ContextMenu(win, mainMenu).create();

        win.loadURL(APP_URL);

        win.on('close', () => {
            this.saveBounds();
        });

        win.webContents.on('will-prevent-unload', (event) => {
            const options: MessageBoxSyncOptions = {
                title: 'Fastmail: Changes not saved',
                type: 'question',
                buttons: ['Cancel', 'Leave'],
                message: 'Do you want to leave Fastmail?',
                detail: 'Changes you made may not be saved.',
            };

            const response = dialog.showMessageBoxSync(win, options);

            if (response === 1) {
                event.preventDefault();
            }
        });

        return this;
    }

    restoreAndFocus() {
        if (this.win) {
            if (this.win.isMinimized()) {
                this.win.restore();
            }

            this.win.focus();
        }
    }

    private setBounds() {
        if (this.win) {
            const bounds = this.store.get(WIN_BOUNDS_KEY);
            if (bounds != undefined) {
                this.win.setBounds(bounds);
            }
        }
    }

    private saveBounds() {
        if (this.win) {
            const bounds = this.win.getBounds();
            this.store.set(WIN_BOUNDS_KEY, bounds);
        }
    }
}

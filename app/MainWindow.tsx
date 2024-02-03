import { BrowserWindow, shell } from "electron";
import Store from "electron-store";
import ContextMenu from "./ContextMenu";
import MainMenu from "./MainMenu";

const APP_URL = "https://app.fastmail.com/";
const WIN_BOUNDS_KEY = "winBounds";

export default class MainWindow {

    private store = new Store();
    private win!: BrowserWindow;

    create(): MainWindow {
        this.win = new BrowserWindow({
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
        this.win.webContents.setWindowOpenHandler(({ url }) => {

            if (url.includes("fastmail.com")) {
                return { action: 'allow' };
            }

            shell.openExternal(url);
            return { action: 'deny' };
        });

        this.win.once('ready-to-show', this.win.show);

        const mainMenu = new MainMenu(this.win).create();
        new ContextMenu(this.win, mainMenu).create();

        this.win.loadURL(APP_URL);

        this.win.on('close', () => {
            this.saveBounds();
        });

        return this;
    }

    private setBounds() {
        const bounds = this.store.get(WIN_BOUNDS_KEY);
        if (bounds != undefined) {
            this.win.setBounds(bounds);
        }
    }

    private saveBounds() {
        const bounds = this.win.getBounds();
        this.store.set(WIN_BOUNDS_KEY, bounds);
    }
}

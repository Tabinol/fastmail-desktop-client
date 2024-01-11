import { BrowserWindow, shell } from "electron";
import Store from "electron-store";
import ContextMenu from "./ContextMenu";

const APP_URL = "https://app.fastmail.com/";
const WIN_BOUNDS_KEY = "winBounds";

export default class MainWindow {

    private store = new Store();
    private win!: BrowserWindow;

    create() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false,
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

        this.win.webContents.on('context-menu', (event, params) => {
            new ContextMenu(this.win, params).create();

        });

        this.win.loadURL(APP_URL);

        this.win.on('close', () => {
            this.saveBounds();
        });
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

import { BrowserWindow, shell } from "electron";
import Store from "electron-store";
import ContextMenu from "./ContextMenu.js";

const APP_URL = "https://app.fastmail.com/";
const WIN_BOUNDS_KEY = "winBounds";

export default class MainWindow {

    #store = new Store();

    #win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            spellcheck: true
        }
    });

    create() {
        this.#setBounds();

        // Click to external browser
        this.#win.webContents.setWindowOpenHandler(({ url }) => {
            console.log(`url=${url}`);

            if (url.includes("fastmail.com")) {
                return { action: 'allow' };
            }

            shell.openExternal(url);
            return { action: 'deny' };
        });

        this.#win.once('ready-to-show', this.#win.show);

        this.#win.webContents.on('context-menu', (event, params) => {
            new ContextMenu(this.#win, params).create();

        })

        this.#win.loadURL(APP_URL);

        this.#win.on('close', () => {
            this.#saveBounds();
        });
    }

    #setBounds() {
        const bounds = this.#store.get(WIN_BOUNDS_KEY);
        if (bounds != undefined) {
            this.#win.setBounds(bounds);
        }
    }

    #saveBounds() {
        const bounds = this.#win.getBounds();
        this.#store.set(WIN_BOUNDS_KEY, bounds);
    }
}

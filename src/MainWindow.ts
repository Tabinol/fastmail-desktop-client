import { BrowserWindow, shell } from "electron";
import { ContextMenu } from "./ContextMenu";

const APP_URL = "https://app.fastmail.com/";

export class MainWindow {

    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            spellcheck: true
        }
    });

    create() {
        // Click to external browser
        this.win.webContents.setWindowOpenHandler(({ url }) => {
            console.log(`url=${url}`);

            if (url.includes("fastmail.com")) {
                return { action: 'allow' };
            }

            shell.openExternal(url);
            return { action: 'deny' };
        });

        this.win.webContents.on('context-menu', (event, params) => {
            new ContextMenu(this.win, event, params).create();

        })

        this.win.loadURL(APP_URL);
    }
}
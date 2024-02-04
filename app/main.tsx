import { app, BrowserWindow } from 'electron';
import MainWindow from './MainWindow';

const mainWindow = new MainWindow();

app.whenReady().then(() => {
    mainWindow.create();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow.create();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

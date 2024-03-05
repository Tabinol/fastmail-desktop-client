import { app, BrowserWindow } from 'electron';
import MainWindow from './MainWindow';

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
}

const mainWindow = new MainWindow();

app.whenReady().then(() => {
  mainWindow.create();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow.create();
    }
  });
});

app.on('second-instance', () => {
  mainWindow.restoreAndFocus();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

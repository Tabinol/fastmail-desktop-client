const { app, BrowserWindow } = require('electron/main')
const { Menu, MenuItem } = require('electron')

const appUrl = "https://app.fastmail.com/"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            spellcheck: true
        }
    })

    win.loadURL(appUrl)

    win.webContents.on('context-menu', (event, params) => {
        const menu = new Menu()

        // Add each spelling suggestion
        for (const suggestion of params.dictionarySuggestions) {
            menu.append(new MenuItem({
                label: suggestion,
                click: () => win.webContents.replaceMisspelling(suggestion)
            }))
        }

        // Allow users to add the misspelled word to the dictionary
        if (params.misspelledWord) {
            menu.append(
                new MenuItem({
                    label: 'Add to dictionary',
                    click: () => win.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
                })
            )
        }

        menu.popup()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

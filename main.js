const electron = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //? Uncomment to hide menu tray
    // win.removeMenu()

    win.loadFile('index.html')
}

electron.app.whenReady().then(() => {
    createWindow()
})

electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') electron.app.quit()
})
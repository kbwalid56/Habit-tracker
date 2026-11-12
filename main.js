const { app, BrowserWindow } = require('electron');
const path = require('path');

// Function to create application window
function createWindow() {

    const win = new BrowserWindow({
        width: 900,
        height: 650,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Load HTML file
    win.loadFile('index.html');
}

// When application is ready
app.whenReady().then(() => {
    createWindow();
});

// Close application on non-Mac systems
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create a browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Allows you to access Node.js in the browser window
        },
    });

    // Load your app’s HTML file (the same one you use for the web version)
    win.loadURL('file://' + path.join(__dirname, 'index.html'));

    // Open DevTools (optional for debugging)
    // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

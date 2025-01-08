const { app, BrowserWindow } = require('electron');
const path = require('path');
const WebSocket = require('ws');

let clients = []; // To store connected clients

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    clients.push(ws);

    ws.on('message', (message) => {
        // Broadcast the message to all connected clients
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter((client) => client !== ws);
    });
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL('file://' + path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

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

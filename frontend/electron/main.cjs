const { app, BrowserWindow } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1100,
        minHeight: 700,
        title: "Contact Management",

        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        },

        autoHideMenuBar: true
    });

    if (app.isPackaged) {
        win.loadURL(
            "https://contact-managment-system-frontend.vercel.app/admin/login"
        );
    } else {
        win.loadURL(
            "http://localhost:5173/admin/login"
        );
    }

    // Temporary: useful for debugging
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
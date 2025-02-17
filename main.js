// 1. Importing Modules
const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron/main");
const path = require("node:path");

app.disableHardwareAcceleration();
let store;

let win;
async function createWindow() {
  const Store = (await import("electron-store")).default;
  store = new Store();
  win = new BrowserWindow({
    width: 350,
    height: 490,
    resizable: false,
    icon: path.join(__dirname, "icons", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (store.get("introSeen", false)) {
    win.loadFile("src/app.html");
  } else {
    win.loadFile("src/index.html");
  }

  // setTimeout(() => {
  //   showDonationDialog();
  // }, 1000); // Delay the dialog by 1s
}

const showDonationDialog = () => {
  dialog
    .showMessageBox(win, {
      type: "info",
      title: "Support Us ❤️",
      message: "Would you like to support us with a donation?",
      icon: path.join(__dirname, "icons", "icon.png"), // Correct icon path
      buttons: ["Donate", "Cancel"],
      defaultId: 0, // "Donate" is selected by default
      cancelId: 1, // "Cancel" button
    })
    .then((result) => {
      if (result.response === 0) {
        // If "Donate" is clicked
        shell.openExternal("https://www.buymeacoffee.com/yourlink");
      }
      // If "Cancel" is clicked, do nothing (dialog closes automatically)
    });
};

ipcMain.on("mark-intro-seen", (event, name) => {
  if (!store) return;
  store.set("introSeen", true);
  store.set("userName", name);
  win.loadFile("src/app.html");
});

// Provide username to the app
ipcMain.handle("get-user-name", () => {
  if (!store) return "User";
  return store.get("userName", "User");
});
ipcMain.on("load-file", (event, fileName) => {
  if (!store) return;
  store.set("introSeen", fileName);
  store.set("userName", "");
  win.loadFile("src/index.html");
});

app.whenReady().then(() => {
  createWindow();

  // Open a window if none are open
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Close app when all windows are closed (except macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

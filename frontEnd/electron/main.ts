import { app, BrowserWindow } from "electron";
import path from "node:path";

const { ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
import log from "electron-log";
const electronLocalshortcut = require("electron-localshortcut");

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
let splashWindow: BrowserWindow | null;
let salaryPersonalWindow: BrowserWindow | null;
let postWindow: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "/logo/logo_dark.svg"),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    resizable: false,
    autoHideMenuBar: true,
    width: 1680,
    height: 1000,
  });

  // devtools
  electronLocalshortcut.register(win, "F12", () => {
    win?.webContents.toggleDevTools();
  });

  // refresh
  electronLocalshortcut.register(win, "F5", () => {
    win?.reload();
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.once("ready-to-show", () => {
    splashWindow?.destroy();
    win?.focus();
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

const createSplashWindow = () => {
  splashWindow = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: "#2e2c29",
  });

  splashWindow.loadURL(`file://${__dirname}/splash.html`);
};

function createSalaryPersonalWindow(url: string) {
  salaryPersonalWindow = new BrowserWindow({
    width: 1000,
    height: 880,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  salaryPersonalWindow.loadFile(path.join(process.env.DIST, "index.html"), { hash: `salary_history_personal/${url}` });
}

ipcMain.on("open-salary-personal-window", (_, url) => {
  createSalaryPersonalWindow(url);
});

function createPostWindow() {
  postWindow = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  postWindow.loadFile(path.join(process.env.DIST, "index.html"), { hash: "post" });
}

ipcMain.on("open-post-window", () => {
  createPostWindow();
});

ipcMain.on("post-data", (_, data) => {
  win?.webContents.send("post-data", data);
});

ipcMain.on("close-post-window", () => {
  if (postWindow) {
    postWindow.close();
    postWindow = null;
  }
});

ipcMain.on("close-salary-personal-window", () => {
  if (salaryPersonalWindow) {
    salaryPersonalWindow.close();
    salaryPersonalWindow = null;
  }
});

ipcMain.on("close-window", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

ipcMain.on("minimize-post-window", () => {
  if (postWindow) {
    postWindow.minimize();
  }
});

ipcMain.on("minimize-salary-personal-window", () => {
  if (salaryPersonalWindow) {
    salaryPersonalWindow.minimize();
  }
});

ipcMain.on("minimize-window", () => {
  if (win) {
    win.minimize();
  }
});

app.on("ready", () => {
  createSplashWindow();
  createWindow();
  setTimeout(() => {
    splashWindow?.destroy();
  }, 5000);
  if (process.env.NODE_ENV === "development") {
    autoUpdater.updateConfigPath = path.join(__dirname, "dev-app-update.yml");
    // 개발 환경에서도 업데이트를 강제
    autoUpdater.forceDevUpdateConfig = true;
  }
  autoUpdater.checkForUpdatesAndNotify();
});
/* Updater ======================================================*/

autoUpdater.on("checking-for-update", () => {
  log.info("업데이트 확인 중...");
  console.log("object");
});

autoUpdater.on("update-available", (_: any) => {
  log.info("업데이트가 가능합니다.");
});

autoUpdater.on("update-not-available", (_: any) => {
  log.info("현재 최신버전입니다.");
});

autoUpdater.on("error", (err: any) => {
  log.info("에러가 발생하였습니다. 에러내용 : " + err);
});

autoUpdater.on("download-progress", (progressObj: any) => {
  let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
  log_message = log_message + " - 현재 " + progressObj.percent + "%";
  log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
  log.info(log_message);
});

autoUpdater.on("update-downloaded", (_: any) => {
  log.info("업데이트가 완료되었습니다.");
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.whenReady().then(createWindow);

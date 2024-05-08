import { app, BrowserWindow } from "electron";
import path from "node:path";

const { ipcMain } = require('electron')

const electronLocalshortcut = require('electron-localshortcut');


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
let splashWindow:BrowserWindow | null;
let newWindow: BrowserWindow | null;
let postWindow: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    width: 1680,
    height: 1000,
  });

  // devtools
  electronLocalshortcut.register(win, 'F12', () => {
    win?.webContents.toggleDevTools()
  });

  // refresh
  electronLocalshortcut.register(win, 'F5', () => {
    win?.reload();
  });    

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.once('ready-to-show', () => {
    splashWindow?.destroy();
    win?.focus(); // 메인 윈도우에 포커스 주기
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
    backgroundColor: '#2e2c29' 
  });

  splashWindow.loadURL(`file://${__dirname}/splash.html`);
};


function createSalaryPersonalWindow(url:string) {
  newWindow = new BrowserWindow({
    width: 1000,
    height: 880,
    autoHideMenuBar: true,
  })
  
  newWindow.loadURL(`http://localhost:5173/#/salary_history_personal/${url}`)
  
  newWindow.on('closed', () => {
    newWindow = null
  })
}

// ipcMain.on('show-login-success-dialog', (event) => {
//   try {
//     dialog.showMessageBox({
//       type: 'info',
//       title: '로그인 성공',
//       message: '로그인되었습니다.',
//       buttons: ['확인']
//     });
//   } catch (error) {
//     console.error('Error showing login success dialog:', error);
//   }
// });

// ipcMain.on('show-member-register-dialog', (event) => {
//   try {
//     dialog.showMessageBox({
//       type: 'question',
//       title: '제출',
//       message: '데이터 입력을 완료하시겠습니까?',
//       buttons: ['Yes', 'No']
//     });
//   } catch (error) {
//     console.error('Error showing login success dialog:', error);
//   }
// });

ipcMain.on('open-salary-personal-window', (event, url) => {
  createSalaryPersonalWindow(url)
})

function createPostWindow() {
  postWindow = new BrowserWindow({
    width: 600,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  })
  
  postWindow.loadURL(`http://localhost:5173/#/post`)
  
  postWindow.on('closed', () => {
    newWindow = null
  })
}

ipcMain.on('open-post-window', (event, url) => {
  createPostWindow()
})

ipcMain.on('close-post-window', (event, url) => {
  if (postWindow) {
    postWindow.close();
    postWindow = null;
  }
});

ipcMain.on("post-data", (event, data) => {
  win?.webContents.send("post-data", data);
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on('ready', () => {
  createSplashWindow();
  setTimeout(() => {
    createWindow();
    splashWindow?.destroy(); // 3초 후에 스플래시 윈도우 제거
  }, 3000);
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.whenReady().then(createWindow);

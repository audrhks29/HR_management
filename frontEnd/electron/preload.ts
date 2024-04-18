import { ipcRenderer, contextBridge, IpcRendererEvent } from 'electron'

// --------- Expose some API to the Renderer process ---------

contextBridge.exposeInMainWorld("electronAPI", {
  // salary
  openSalaryPersonalWindow: (url:string) => ipcRenderer.send("open-salary-personal-window",url),

  // post
  openPostWindow: () => ipcRenderer.send("open-post-window"),
  closePostWindow: () => ipcRenderer.send("close-post-window"),
  sendPostData: (data:any) => ipcRenderer.send("post-data", data),
  onPostData: (callback: (data: any) => void) => {
    ipcRenderer.on("post-data", (event, data) => {
      callback(data);
    });
  },
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, listener);
  },
  off: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.off(channel, listener);
  },
});

contextBridge.exposeInMainWorld("alertAPI", {
  loginSuccess: () => ipcRenderer.send("show-login-success-dialog")
});

contextBridge.exposeInMainWorld("confirmAPI", {
  register: () => ipcRenderer.send("show-member-register-dialog")
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

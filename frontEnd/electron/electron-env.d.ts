/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    DIST: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("electron").IpcRenderer;
  electronAPI: {
    off(arg0: string, handlePostData: (event: any, data: any) => void): unknown;
    on(arg0: string, handlePostData: (event: any, data: any) => void): unknown;
    openSalaryPersonalWindow: (url:string) => void;
    openPostWindow:()=>void;
    closePostWindow:()=>void;
    sendPostData: (data:any)=>void;
    onPostData:(handlePostData)=>void;
  };
  alertAPI:{
    loginSuccess:()=>void;
  };
  confirmAPI:{
    register:()=>void;
  }
}

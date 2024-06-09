/// <reference types="vite/client" />

interface DbApi {
  alarms?: {
    getAlarms: () => IAlarm[];
    insertAlarm: (alarm: IAlarm) => void;
    deleteAlarm: (id: string) => void;
    updateAlarm: (alarm: IAlarm) => void;
  };
}
interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import("electron").IpcRenderer;
  dbApi: DbApi;
}

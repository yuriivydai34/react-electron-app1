// src/electron/preload.ts

import { contextBridge, ipcRenderer } from "electron";


export const backend = {
  nodeVersion: async (msg: string): Promise<string> =>
    await ipcRenderer.invoke("node-version", msg),

  connectToDatabase: async (): Promise<void> => {
    try {
      await ipcRenderer.invoke("connect-to-database");
      console.log("Connected to the database.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }
};

contextBridge.exposeInMainWorld("backend", backend);
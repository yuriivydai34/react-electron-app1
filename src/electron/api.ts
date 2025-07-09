// src/electron/api.ts

import { ipcMain } from "electron";
import type { IpcMainInvokeEvent } from "electron";

ipcMain.handle(
  "node-version",
  (event: IpcMainInvokeEvent, msg: string): string => {
    console.log(event);
    console.log(msg);

    return process.versions.node;
  }
);
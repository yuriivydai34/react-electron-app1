// src/electron/api.ts

import { ipcMain } from "electron";
import type { IpcMainInvokeEvent } from "electron";
import type { Error, Row } from "./types";



ipcMain.handle(
  "node-version",
  (event: IpcMainInvokeEvent, msg: string): string => {
    console.log(event);
    console.log(msg);

    return process.versions.node;
  }
);

ipcMain.handle(
  "connect-to-database",
  (event: IpcMainInvokeEvent): string => {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
      db.run("CREATE TABLE lorem (info TEXT)");

      const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (let i = 0; i < 10; i++) {
        stmt.run(`Ipsum ${i}`);
      }
      stmt.finalize();

      db.each("SELECT rowid AS id, info FROM lorem", (err: Error, row: Row) => {
        if (err) {
          console.error("Error fetching data:", err.message);
        } else {
          console.log(row.id + ": " + row.info);
        }
      });
    });

    // Close the database connection
    db.close();

    return "Connected to the database";
  }
);
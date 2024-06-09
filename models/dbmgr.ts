import Database from "better-sqlite3";
import path from "node:path";

// TODO: setup different db for the different environments
const dbmgr = new Database(path.join("src", "assets", "alarmclock.db"), {
  fileMustExist: true,
});
dbmgr.pragma("journal_mode = WAL");

export { dbmgr };

import { Statement, RunResult } from "better-sqlite3";
import { dbmgr } from "./dbmgr";
import { IAlarm } from "@/type";

interface IAlarmDB {
  time: number;
  repeat: number;
  id: string;
}

export const getAlarms = (): IAlarm[] => {
  try {
    const query = "SELECT * FROM alarms";
    const stmt: Statement = dbmgr.prepare(query);
    const res: unknown = stmt.all();

    return (res as IAlarmDB[]).map((alarm) => ({
      ...alarm,
      // parse repeat as SQLITE stores bollean as 1/0
      repeat: alarm.repeat === 1 ? true : false,
    })) as IAlarm[];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const insertAlarm = (alarm: IAlarm): void => {
  const { id, time, repeat } = alarm;
  const bool = repeat ? 1 : 0;

  try {
    const insertQuery: Statement = dbmgr.prepare(
      `INSERT INTO alarms (id, time, repeat) VALUES (?, ?, ?)`
    );

    const transaction = dbmgr.transaction(() => {
      const info: RunResult = insertQuery.run(id, time, bool);
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into alarms`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteAlarm = (id: string): void => {
  try {
    const deleteQuery: Statement = dbmgr.prepare(
      `DELETE FROM alarms WHERE id = ?`
    );
    const transaction = dbmgr.transaction(() => {
      const info: RunResult = deleteQuery.run(id);
      console.log(`Deleted ${info.changes} rows with ID ${id} from alarms`);
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateAlarm = (alarm: IAlarm): void => {
  const { id, time, repeat } = alarm;
  const bool = repeat ? 1 : 0;
  try {
    const updateQuery: Statement = dbmgr.prepare(
      `UPDATE alarms SET uid = ?, time = ?, repeat = ? WHERE id = ?`
    );

    const transaction = dbmgr.transaction(() => {
      const info: RunResult = updateQuery.run(time, bool, id);
      console.log(`Updated ${info.changes} rows with ID ${id} in alarms`);
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

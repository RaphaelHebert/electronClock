import { IAlarm } from "@/type";

export const fetchAlarms = () => {
  const data = window.dbApi.alarms?.getAlarms();
  return data;
};

export const deleteAlarm = (id: string) => {
  window.dbApi.alarms?.deleteAlarm(id);
  return;
};

export const insertAlarm = (alarm: IAlarm) => {
  window.dbApi.alarms?.insertAlarm(alarm);
  return;
};

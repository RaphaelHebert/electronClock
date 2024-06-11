import React, { useState, useEffect } from "react";
import { IAlarm } from "@/type";
import { Button, Box, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AlarmCard, AlarmModal, AddAlarmModal } from "@/components";
import { fetchAlarms, deleteAlarm } from "@/db/alarms";
import {
  isDateBeforeNow,
  millisecondsUntilEndOfDay,
  getHourMinuteDifference,
} from "@/utils/time";

const AlarmList: React.FC = () => {
  const [alarms, setAlarms] = useState<IAlarm[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newDay, setNewDay] = useState<number>(0);
  const [ringingAlarm, setRingingAlarm] = useState<IAlarm | null>(null);

  const updateAlarmList = () => {
    const data = fetchAlarms();
    if (data) setAlarms(data);
  };

  const cleanUpAlarms = () => {
    if (alarms) {
      alarms.forEach((alarm) => {
        if (getHourMinuteDifference(alarm.time) <= 0 && !alarm.repeat) {
          deleteAlarm(alarm.id);
        }
      });
    }
  };

  // Handle closing the AddAlarmModal
  const handleModalClose = () => {
    setIsModalOpen(false);
    updateAlarmList();
  };

  // Initial load of alarm list
  useEffect(() => {
    updateAlarmList();
  }, []);

  // Effect to manage alarm timeouts and daily reset
  useEffect(() => {
    const timeOuts: NodeJS.Timeout[] = [];
    if (alarms) {
      // reprocess the alarm at the beginning of every day
      timeOuts.push(
        setTimeout(() => {
          setNewDay((prev) => prev + 1);
        }, millisecondsUntilEndOfDay())
      );
      alarms.forEach((alarm) => {
        if (isDateBeforeNow(alarm.time) && alarm.repeat) return;
        const diff = getHourMinuteDifference(alarm.time);
        if (diff > 0) {
          timeOuts.push(
            setTimeout(() => {
              setRingingAlarm(alarm);
              cleanUpAlarms();
              updateAlarmList();
            }, diff)
          );
        }
      });
      return () => {
        timeOuts.forEach((value) => {
          clearTimeout(value);
        });
      };
    }
  }, [alarms, newDay]);

  const handleCloseRingingAlarm = () => {
    cleanUpAlarms();
    setRingingAlarm(null);
  };

  return (
    <Stack>
      <Button
        sx={{ marginBottom: "20px" }}
        variant="contained"
        onClick={() => setIsModalOpen(true)}
        startIcon={<AddIcon />}
      >
        Add alarm
      </Button>
      <Box sx={{ padding: "5px", height: "380px", overflow: "auto" }}>
        {alarms &&
          alarms.map((alarm) => (
            <AlarmCard
              key={alarm.id}
              alarm={alarm}
              updateAlarmList={updateAlarmList}
            />
          ))}
      </Box>
      <AddAlarmModal open={isModalOpen} onClose={handleModalClose} />
      <AlarmModal
        ringingAlarm={ringingAlarm}
        onClose={handleCloseRingingAlarm}
      />
    </Stack>
  );
};

export default AlarmList;

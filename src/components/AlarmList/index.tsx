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
  const [alarms, setAlarms] = useState<IAlarm[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newDay, setNewDay] = useState<number>(0);

  const [ringingAlarm, setRingingAlarm] = useState<IAlarm | null>(null);

  const updatedAlarmList = () => {
    const data = fetchAlarms();
    setAlarms(data);
  };

  const cleanUpAlarms = () => {
    if (alarms) {
      alarms.forEach((alarm) => {
        if (getHourMinuteDifference(alarm.time) <= 0) {
          console.log("ok");
          deleteAlarm(alarm.id);
        }
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    updatedAlarmList();
  };

  useEffect(() => {
    updatedAlarmList();
  }, []);

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
              updatedAlarmList();
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
              updatedAlarmList={updatedAlarmList}
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

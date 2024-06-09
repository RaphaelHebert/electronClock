import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { IAlarm } from "@/type";
import { Button, Modal, Box, Stack, Paper } from "@mui/material";
import { Alarm, AlarmCard } from "@/components";
import { fetchAlarms, deleteAlarm } from "@/db/alarms";
import {
  isDateBeforeNow,
  millisecondsUntilEndOfDay,
  getHourMinuteDifference,
} from "@/utils/time";

const AlarmList: React.FC = () => {
  const [alarms, setAlarms] = useState<IAlarm[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDay, setNewDay] = useState<number>(0);

  const [ringingAlarm, setRingingAlarm] = useState<IAlarm | null>(null);

  const updatedAlarmList = () => {
    const data = fetchAlarms();
    setAlarms(data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    updatedAlarmList();
  };

  useEffect(() => {
    const alarms = fetchAlarms();
    setAlarms(alarms);
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
    if (!ringingAlarm?.repeat) {
      if (ringingAlarm) deleteAlarm(ringingAlarm?.id);
    }
    setRingingAlarm(null);
    updatedAlarmList();
  };

  return (
    <Paper>
      <Stack>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Add alarm
        </Button>
        {alarms &&
          alarms.map((alarm) => (
            <AlarmCard
              key={alarm.id}
              alarm={alarm}
              updatedAlarmList={updatedAlarmList}
            />
          ))}

        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Alarm close={handleModalClose} />
          </Box>
        </Modal>
        <Modal open={!!ringingAlarm} onClose={handleCloseRingingAlarm}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            {ringingAlarm && (
              <div>{`Alarm: ${dayjs(ringingAlarm.time).hour()}:${dayjs(
                ringingAlarm.time
              ).minute()}`}</div>
            )}
          </Box>
        </Modal>
      </Stack>
    </Paper>
  );
};

export default AlarmList;

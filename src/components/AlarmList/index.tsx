import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { IAlarm } from "@/type";
import { Button, Typography, Stack, Paper, Modal, Box } from "@mui/material";
import { Alarm, AlarmCard } from "@/components";

const isDateBeforeNow = (unixTime: number): boolean => {
  const now = dayjs(); // Get the current date and time
  const dateToCheck = dayjs(unixTime); // Convert the Unix timestamp to a Dayjs object

  return dateToCheck.isBefore(now); // Check if the date is before now
};

const millisecondsUntilEndOfDay = (): number => {
  // Get the current time
  const now = dayjs();

  // Get the end of the day
  const endOfDay = now.endOf("day");

  // Calculate the difference between now and the end of the day
  const difference = endOfDay.diff(now, "millisecond");

  return difference;
};

const getHourMinuteDifference = (unixTime: number): number => {
  // Get the current time
  const now = dayjs();

  // Convert the Unix timestamp to a Dayjs object
  const dateToCheck = dayjs(unixTime);

  // Extract hour and minute components from the Unix timestamp
  const hour = dateToCheck.hour();
  const minute = dateToCheck.minute();
  const second = dateToCheck.second();

  // Calculate the difference in hours and minutes
  const hourDifference = now.hour() - hour;
  const minuteDifference = now.minute() - minute;
  const secondDifference = now.second() - second;

  // Convert the differences to milliseconds
  const hourDifferenceMs = hourDifference * 60 * 60 * 1000;
  const minuteDifferenceMs = minuteDifference * 60 * 1000;
  const secondDifferenceMs = secondDifference * 1000;

  // Return the total difference in milliseconds
  return -(hourDifferenceMs + minuteDifferenceMs + secondDifferenceMs);
};

const AlarmList: React.FC = () => {
  const [alarms, setAlarms] = useState<IAlarm[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDay, setNewDay] = useState<number>(0);

  const [alarmMessageOpen, setAlarmMessageOpen] = useState<boolean>(false);
  const [alarmMessage, setAlarmMessage] = useState<string>("");

  const fetchAlarms = (alarm: IAlarm | null = null) => {
    // TODO: get the alarms from db
    setAlarms((prev) => {
      if (!alarm) {
        return;
      }
      if (prev && alarm) {
        return [...prev, alarm];
      }
      return [alarm];
    });
  };

  const handleAddAlarm = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchAlarms();
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
        if (isDateBeforeNow(alarm.time) && !alarm.repeat) return;
        const diff = getHourMinuteDifference(alarm.time);
        if (diff > 0) {
          timeOuts.push(
            setTimeout(() => {
              const alarmTime = dayjs(alarm.time);

              // TODO if alarm is not to be repeated delete it
              setAlarmMessage(
                `Alarm: ${alarmTime.hour()}:${alarmTime.minute()}`
              );
              setAlarmMessageOpen(true);
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

  return (
    <>
      {alarms &&
        alarms.map((alarm) => (
          <AlarmCard key={alarm.id} alarm={alarm} fetchAlarms={fetchAlarms} />
        ))}
      <Button variant="contained" onClick={handleAddAlarm}>
        Add alarm
      </Button>

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
          <Alarm close={handleModalClose} fetchAlarms={fetchAlarms} />
        </Box>
      </Modal>
      <Modal open={alarmMessageOpen} onClose={() => setAlarmMessageOpen(false)}>
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
          <div>{alarmMessage}</div>
        </Box>
      </Modal>
    </>
  );
};

export default AlarmList;

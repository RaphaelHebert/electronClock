import React from "react";
import dayjs from "dayjs";
import { IAlarm } from "@/type";
import { Button, Typography, Stack, Paper } from "@mui/material";
import { deleteAlarm } from "@/db/alarms";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IProps {
  alarm: IAlarm;
  updateAlarmList: () => void;
}

const AlarmCard: React.FC<IProps> = ({ alarm, updateAlarmList }) => {
  const { time, id, repeat } = alarm;

  const formattedTime = repeat
    ? dayjs(time).format("HH:mm")
    : dayjs(time).format("YYYY-MM-DD HH:mm");

  const handleDelete = () => {
    deleteAlarm(id);
    updateAlarmList();
  };

  return (
    <Paper elevation={3} style={{ padding: "12px", marginBottom: "12px" }}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="h6">
          {repeat ? `Everyday ${formattedTime}` : formattedTime}
        </Typography>
        <Button
          onClick={handleDelete}
          sx={{ width: "100%" }}
          variant="outlined"
          color="secondary"
          startIcon={<DeleteOutlineIcon />}
        >
          delete alarm
        </Button>
      </Stack>
    </Paper>
  );
};

export default AlarmCard;

import React from "react";
import dayjs from "dayjs";
import { IAlarm } from "@/type";
import { Button, Typography, Stack, Paper } from "@mui/material";

interface IProps {
  alarm: IAlarm;
  fetchAlarms: () => void;
}
const AlarmCard: React.FC<IProps> = ({ alarm, fetchAlarms }) => {
  const { time, id, repeat } = alarm;

  const formattedTime = repeat
    ? dayjs(time).format("HH:mm")
    : dayjs(time).format("YYYY-MM-DD HH:mm");

  const handleDelete = () => {
    // TODO delete from db and refetch alarms
    fetchAlarms();
    console.log(`deleting alarm ${id}`);
  };

  return (
    <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
      <Stack direction="column" spacing={1}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {formattedTime}
        </Typography>
        {repeat && (
          <Typography variant="body2" style={{ fontStyle: "italic" }}>
            Everyday
          </Typography>
        )}
        <Button onClick={handleDelete} variant="outlined" color="primary">
          Delete alarm
        </Button>
      </Stack>
    </Paper>
  );
};

export default AlarmCard;

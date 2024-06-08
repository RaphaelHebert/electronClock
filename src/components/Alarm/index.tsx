import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Checkbox, FormControlLabel } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IAlarm } from "@/type";

interface IProps {
  close: () => void;
  fetchAlarms: (alarm: IAlarm) => void;
}

const Alarm: React.FC<IProps> = ({ close, fetchAlarms }) => {
  // Initialize the state with the current Unix timestamp in milliseconds
  const [fromDate, setFormDate] = useState<number>(dayjs().valueOf());
  const [checked, setChecked] = useState<boolean>(true);

  useEffect(() => {
    console.log(fromDate); // This will log the Unix timestamp in milliseconds
  }, [fromDate]);

  const handleCheckbox = () => {
    setChecked((prev) => !prev);
  };

  const handleAccept = (newValue: Dayjs | null) => {
    if (newValue === null) {
      return;
    }
    const newAlarm: IAlarm = {
      time: newValue.valueOf(),
      repeat: checked,
      id: uuidv4(),
    };
    fetchAlarms(newAlarm);
    // TODO: add to DB
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControlLabel
        control={
          <Checkbox
            id=""
            checked={checked}
            onChange={handleCheckbox}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="repeat everyday"
      />
      <StaticDateTimePicker
        value={dayjs(fromDate)} // Convert Unix timestamp to dayjs object
        onChange={(newValue: Dayjs | null) => {
          if (newValue) {
            setFormDate(newValue.valueOf()); // Convert dayjs object to Unix timestamp
          }
        }}
        onAccept={handleAccept}
        // TODO: create custom action bar see: https://github.com/mui/mui-x/issues/8495
        onClose={close}
      />
    </LocalizationProvider>
  );
};

export default Alarm;

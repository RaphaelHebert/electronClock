import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Checkbox, FormControlLabel } from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

import { IAlarm } from "@/type";
import { insertAlarm } from "@/db/alarms";

interface IProps {
  close: () => void;
}

const Alarm: React.FC<IProps> = ({ close }) => {
  // Initialize the state with the current Unix timestamp in milliseconds
  const [fromDate, setFormDate] = useState<number>(dayjs().valueOf());
  const [checked, setChecked] = useState<boolean>(true);

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
    insertAlarm(newAlarm);
  };
  return (
    <>
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
    </>
  );
};

export default Alarm;

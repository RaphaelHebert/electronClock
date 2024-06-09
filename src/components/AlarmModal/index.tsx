import { Modal, Box } from "@mui/material";
import dayjs from "dayjs";
import { IAlarm } from "@/type";

interface IProps {
  ringingAlarm: IAlarm | null;
  onClose: () => void;
}

const AlarmModal: React.FC<IProps> = ({ ringingAlarm, onClose }) => {
  return (
    <Modal open={!!ringingAlarm} onClose={onClose}>
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
  );
};

export default AlarmModal;

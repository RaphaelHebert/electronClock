import { Modal, Box } from "@mui/material";
import { Alarm } from "@/components";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const AddAlarmModal: React.FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
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
        <Alarm close={onClose} />
      </Box>
    </Modal>
  );
};

export default AddAlarmModal;

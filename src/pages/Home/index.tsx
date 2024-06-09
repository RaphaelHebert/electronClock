import { Analogic, Digital, AlarmList } from "@/components";
import { Stack, Paper } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Stack direction="row">
      <Paper>
        <Stack>
          <Analogic />
          <Digital />
        </Stack>
      </Paper>
      <AlarmList />
    </Stack>
  );
};

export default Home;

import { Analogic, Digital, AlarmList } from "@/components";
import { Stack, Paper, Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Stack direction="row" sx={{ width: "100vw" }}>
      <Paper sx={{ margin: "0 20px" }} elevation={5}>
        <Stack sx={{ alignItems: "center" }}>
          <Analogic />
          <Digital />
        </Stack>
      </Paper>
      <Box sx={{ flex: 1, maxWidth: "250px", marginRight: "auto" }}>
        <AlarmList />
      </Box>
    </Stack>
  );
};

export default Home;

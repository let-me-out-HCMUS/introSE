import { Box } from "@mui/material";
import PlayerAppBar from "../features/players/PlayerAppBar";
import PlayerTable from "../features/players/PlayerTable";

export default function PlayerPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingY: "16",
      }}
    >
      <PlayerAppBar />
      <PlayerTable />
    </Box>
  );
}

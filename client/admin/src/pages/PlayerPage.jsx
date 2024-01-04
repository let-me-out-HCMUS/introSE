import { Box } from "@mui/material";
import PlayerAppBar from "../features/players/PlayerAppBar";
import { useState } from "react";
import PlayerTable from "../features/players/PlayerTable";

export default function PlayerPage() {
  const [club, setClub] = useState();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingY: "16",
      }}
    >
      <PlayerAppBar club={club} setClub={setClub} />

      {<PlayerTable clubId={club} />}
    </Box>
  );
}

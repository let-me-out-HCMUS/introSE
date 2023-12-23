import { useEffect, useState } from "react";
import { clubs as MockClubs } from "../mocks/clubPage";
import { Divider, Typography } from "@mui/material";
import PlayerTable from "../features/players/PlayerTable";
import ClubDetail from "../features/clubs/ClubDetail";

export default function ClubPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = () => {
      setClubs(MockClubs);
    };

    fetchClubs();
  }, [clubs]);

  return (
    <div className="flex flex-col justify-center">
      <ClubDetail />
      <Divider sx={{ my: 4 }} />

      <Typography
        component="div"
        variant="h4"
        sx={{ fontWeight: "bold", margin: 2 }}
      >
        Cầu thủ
      </Typography>
      <PlayerTable />
    </div>
  );
}

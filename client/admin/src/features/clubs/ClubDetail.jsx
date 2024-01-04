import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import PlayerTable from "../players/PlayerTable";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClubById } from "../../services/apiClubs";

export default function ClubDetail() {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["club", id],
    queryFn: () => getClubById(id),
  });

  if (isLoading) {
    return <LinearProgress color="success" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const club = data.team;

  return (
    <>
      <Card sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          image={club.image}
          sx={{
            width: 300,
            padding: 5,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <CardContent>
            <Typography
              component="div"
              variant="h2"
              sx={{ fontWeight: "bold" }}
            >
              {club.clubName}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {club.stadium}
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Divider sx={{ margin: "20px 0" }} />

      <PlayerTable clubId={id} />
    </>
  );
}

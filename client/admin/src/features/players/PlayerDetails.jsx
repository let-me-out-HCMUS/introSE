import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
// import PlayerGoalTable from "./PlayerGoalTable";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlayerByPlayerId } from "../../services/apiPlayers";

export default function PlayerDetails() {
  const { id } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["player", id],
    queryFn: () => getPlayerByPlayerId(id),
  });

  if (isLoading) {
    return <LinearProgress color="success" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const player = data.player;

  return (
    <div className="flex flex-col justify-center">
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          image={player.image}
          sx={{ width: 400, height: 400 }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <CardContent>
            <Avatar
              variant="square"
              sx={{ width: 64, height: 64, fontSize: 52, bgcolor: "#4ade80" }}
            >
              {player.shirtNum}
            </Avatar>
          </CardContent>
          <CardContent>
            <Typography
              component="div"
              variant="h2"
              sx={{ fontWeight: "bold" }}
            >
              {player.name}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" color="text.secondary" component="div">
              Câu lạc bộ: {player.club.clubName}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" color="text.secondary" component="div">
              Loại cầu thủ: {player.type}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant="h5" color="text.secondary" component="div">
              Tổng số bàn thắng: {player.totalGoal}
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Divider sx={{ my: 4 }} />
    </div>
  );
}

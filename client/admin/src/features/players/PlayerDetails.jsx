import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import PlayerGoalTable from "./PlayerGoalTable";

const player = {
  number: 7,
  avatar: "img",
  name: "Cristiano Ronaliem",
  total_goal: 53,
  team: "Al-Nassr FC",
};

export default function PlayerDetails() {
  return (
    <div className="flex flex-col justify-center">
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          image="https://cdn-i.vtcnews.vn/resize/th/upload/2023/12/23/cristiano-ronaldo-07305037.jpg"
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
              {player.number}
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
              Câu lạc bộ: {player.team}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" color="text.secondary" component="div">
              Tổng số bàn thắng: {player.total_goal}
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Divider sx={{ my: 4 }} />

      <Typography
        component="div"
        variant="h4"
        sx={{ fontWeight: "bold", margin: 2 }}
      >
        Số bàn thắng trong từng trận
      </Typography>
      <PlayerGoalTable />
    </div>
  );
}

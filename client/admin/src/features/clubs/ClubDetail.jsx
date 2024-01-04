import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import PlayerTable from "../players/PlayerTable";
import { useParams } from "react-router-dom";

export default function ClubDetail() {
  // get current club id from url
  const { id } = useParams();

  // query club by id
  // const { data: club, isLoading } = useQuery(["clubs", id], () =>
  //   clubApi.get(id)
  // );

  const club = {
    id,
    name: "Hà Nội FC",
    logo: "https://hanoifc.com.vn/images/logo-v2.png",
    stadium: "Hàng Đẫy",
  };

  return (
    <>
      <Card sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          image={club.logo}
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
              {club.name}
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

      <PlayerTable from={club.id} />
    </>
  );
}

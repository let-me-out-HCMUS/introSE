import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

import PlayerTable from "../players/PlayerTable";

export default function ClubDetail() {
  return (
    <div className="flex flex-col justify-center px-16 py-16	">
      <Card sx={{ display: "flex" }}>
        <CardMedia component="img" image="https://placehold.co/450" />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
              Hà Nội FC
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Sân nhà: Hàng Đẫy
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Divider sx={{ my: 4 }} />

      <Typography component="div" variant="h2" sx={{ fontWeight: "bold" }}>
        Cầu thủ
      </Typography>
      <PlayerTable />
    </div>
  );
}

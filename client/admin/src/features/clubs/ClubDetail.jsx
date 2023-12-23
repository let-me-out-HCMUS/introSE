import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function ClubDetail() {
  return (
    <>
      <Card
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          image="https://hanoifc.com.vn/images/logo-v2.png"
          sx={{
            width: 500,
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
    </>
  );
}

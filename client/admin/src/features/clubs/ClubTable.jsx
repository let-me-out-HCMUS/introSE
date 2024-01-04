import { Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

export default function ClubTable({ clubs }) {
  return (
    <Card
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid container spacing={1}>
        {clubs.map((club, index) => (
          <Grid item xs={3} key={index} sx={{ padding: 2 }}>
            <Link to={`/clubs/${club.id}`}>
              <Paper sx={{ margin: 2, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  image="https://hanoifc.com.vn/images/logo-v2.png"
                  sx={{
                    marginX: "auto",
                    width: 220,
                    padding: 5,
                  }}
                />
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingX: 3,
                  }}
                >
                  <Typography>
                    <b>{club.name}</b>
                  </Typography>

                  <EastIcon />
                </Paper>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

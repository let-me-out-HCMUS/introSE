import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getClubs } from "../../services/apiClubs";

export default function PlayerAppBar({ club, setClub }) {
  const handleChange = (event) => {
    setClub(event.target.value);
  };

  const handleDeleteFilter = () => {
    setClub(undefined);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["clubs"],
    queryFn: getClubs,
  });

  if (isLoading) {
    return <LinearProgress color="success" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const clubs = data.club;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography
          component="div"
          variant="h5"
          sx={{ fontWeight: "bold", margin: 2 }}
        >
          Danh sách cầu thủ
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Club</InputLabel>
          <Select value={club} label="Club" onChange={handleChange}>
            {clubs.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.clubName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleDeleteFilter}
          sx={{ marginX: 2, paddingTop: 1 }}
        >
          Xóa filter
        </Button>
      </Grid>
    </Grid>
  );
}

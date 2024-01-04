import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { clubs } from "../../mocks/clubPage";
import { IoSearchCircleOutline } from "react-icons/io5";

export default function PlayerAppBar() {
  const [club, setClub] = useState("");

  const handleChange = (event) => {
    setClub(event.target.value);
  };

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
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tên cầu thủ"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

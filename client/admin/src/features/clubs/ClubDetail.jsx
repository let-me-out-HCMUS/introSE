import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import PlayerTable from "../players/PlayerTable";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getClubById, updateClub } from "../../services/apiClubs";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ClubDetail() {
  const [open, setOpen] = useState(false);
  const [clubName, setclubName] = useState("");
  const [stadium, setStadium] = useState("");

  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["club", id],
    queryFn: () => getClubById(id),
  });

  const { mutate } = useMutation({
    mutationFn: (data) => {
      updateClub({ id, ...data });
    },
    onSuccess: () => {
      toast.success("Chỉnh sửa thành công");
    },
    onError: () => {
      toast.error("Chỉnh sửa thất bại");
    },
  });

  if (isLoading) {
    return <LinearProgress color="success" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const club = data.team;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    mutate({ clubName, stadium });
  };
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

      <button
        onClick={handleClickOpen}
        type="button"
        className="ml-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Chỉnh sửa
      </button>

      <Divider sx={{ margin: "20px 0" }} />

      <PlayerTable clubId={id} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa thông tin câu lạc bộ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="clubName"
            label="Tên câu lạc bộ"
            type="text"
            fullWidth
            variant="standard"
            value={clubName}
            onChange={(e) => setclubName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="stadium"
            label="Sân nhà"
            type="text"
            fullWidth
            variant="standard"
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit" onClick={handleSubmit}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

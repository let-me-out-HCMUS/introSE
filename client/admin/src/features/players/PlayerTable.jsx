import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, LinearProgress } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";

import { getPlayersWithConditionalChecking } from "../../services/apiPlayers";

export default function PlayerTable({ clubId }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["players", clubId],
    queryFn: () => getPlayersWithConditionalChecking(clubId),
  });

  if (isLoading) {
    return <LinearProgress color="success" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const players = data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell> {/* Avatar */} </TableCell>
            <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
              Họ và tên
            </TableCell>
            <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
              Câu lạc bộ
            </TableCell>
            <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
              Loại cầu thủ
            </TableCell>
            <TableCell>{/* Navigation link */}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar src={row.image} alt={row.name} />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.club.clubName}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>
                <Link to={`/players/${row.id}`}>
                  Xem chi tiết <ArrowRightAltIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

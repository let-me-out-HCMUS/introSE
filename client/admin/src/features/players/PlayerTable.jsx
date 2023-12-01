import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, createTheme } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function createData(avatar, name, club, type) {
  return { avatar, name, club, type };
}

const rows = [
  createData("CB", "Chris Bumstead", "IFBB Pro", "Trong nước"),
  createData("SS", "Sam Sulek", "IFBB Pro", "Trong nước"),
  createData("RD", "Ramon Dino", "IFBB Pro", "Trong nước"),
];

export default function PlayerTable() {
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar src={row.avatar} alt={row.name} />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.club}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>
                Xem chi tiết <ArrowRightAltIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

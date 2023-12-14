import { green, pink } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function renderResult(row) {
  return row.map((result, index) => {
    switch (result) {
      case -1:
        return (
          <Avatar key={index} sx={{ bgcolor: pink[500] }}>
            L
          </Avatar>
        );

      case 0:
        return <Avatar key={index}>D</Avatar>;

      case 1:
        return (
          <Avatar key={index} sx={{ bgcolor: green[500] }}>
            W
          </Avatar>
        );
    }
  });
}

const fields = [
  "Hạng",
  "Câu lạc bộ",
  "Trận",
  "Thắng",
  "Hòa",
  "Thua",
  "Bàn thắng",
  "Bàn thua",
  "Hiệu số",
  "Điểm",
  "5 trận gần nhất",
];

function createData(club, played, won, drawn, lost, gf, ga, gd, points, last5) {
  return { club, played, won, drawn, lost, gf, ga, gd, points, last5 };
}
/*
 * rank: hạng
 * club: tên câu lạc bộ
 * played: số trận đã đá
 * won: số trận thắng
 * drawn: số trận hòa
 * lost: số trận thua
 * gf: số bàn thắng
 * ga: số bàn thua
 * gd: hiệu số
 * points: điểm
 * last5: mảng 5 trận gần nhất:
 * 1: thắng, 0: hòa, -1: thua
 */
const rows = [
  createData("Arsenal", 13, 9, 3, 1, 27, 10, 17, 30, [0, 1, -1, 1, 1]),
  createData("Manchester City", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
  createData("Manchester United", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
  createData("Chelsea", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
  createData("Liverpool", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
  createData("Tottenham Hotspur", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
  createData("Leicester City", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
  createData("West Ham United", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
  createData("Everton", 13, 9, 2, 2, 33, 13, 20, 29, [1, 1, 1, 0, 0]),
];

function RankTable() {
  return (
    <TableContainer component={Paper} sx={{ ml: 8, mr: 8 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={field} sx={{ fontWeight: "bold" }} align="center">
                {field}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.club}>
              <TableCell component="th" scope="row" align="center">
                {index + 1}
              </TableCell>
              <TableCell>{row.club}</TableCell>
              <TableCell align="center">{row.played}</TableCell>
              <TableCell align="center">{row.won}</TableCell>
              <TableCell align="center">{row.drawn}</TableCell>
              <TableCell align="center">{row.lost}</TableCell>
              <TableCell align="center">{row.gf}</TableCell>
              <TableCell align="center">{row.ga}</TableCell>
              <TableCell align="center">{row.gd}</TableCell>
              <TableCell align="center">{row.points}</TableCell>
              <TableCell align="center">
                <Stack spacing={1} direction="row">
                  {renderResult(row.last5)}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RankTable;

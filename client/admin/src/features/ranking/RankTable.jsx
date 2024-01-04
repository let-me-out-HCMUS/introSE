/* eslint-disable react/prop-types */
// import { green, pink } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";

// function renderResult(row) {
//   return row.map((result, index) => {
//     switch (result) {
//       case "L":
//         return (
//           <Avatar key={index} sx={{ bgcolor: pink[500] }}>
//             L
//           </Avatar>
//         );

//       case "D":
//         return <Avatar key={index}>D</Avatar>;

//       case "W":
//         return (
//           <Avatar key={index} sx={{ bgcolor: green[500] }}>
//             W
//           </Avatar>
//         );
//     }
//   });
// }

const fields = [
  "Hạng",
  
  "Câu lạc bộ",
  // "Trận",
  "Thắng",
  "Hòa",
  "Thua",
  "Bàn thắng",
  "Bàn thua",
  "Hiệu số",
  "Điểm",
  // "5 trận gần nhất",
];

function RankTable({ rankedClubs }) {
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
          {rankedClubs.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {index + 1}
              </TableCell>
              <TableCell align="center">
                  <div className="flex items-center">
                    <Avatar sx={{width: 40, height: 40}} src={row.image} />
                    <b className="ml-4">{row.clubName}</b>
                  </div>
              </TableCell>
              <TableCell></TableCell>
              {/* <TableCell align="center">{row.played}</TableCell> */}
              <TableCell align="center">{row.won}</TableCell>
              <TableCell align="center">{row.drawn}</TableCell>
              <TableCell align="center">{row.lost}</TableCell>
              <TableCell align="center">{row.gf}</TableCell>
              <TableCell align="center">{row.ga}</TableCell>
              <TableCell align="center">{row.gd}</TableCell>
              <TableCell align="center">{row.points}</TableCell>
              {/* <TableCell align="center">
                <Stack spacing={1} direction="row">
                  renderResult(row.last5)
                </Stack>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RankTable;

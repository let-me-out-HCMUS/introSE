// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// const mockGoal = [
//   {
//     teamA: "Manchester United",
//     teamB: "Manchester City",
//     time: "20/11/2023",
//     score: "15:1",
//     goal: "15",
//   },
//   {
//     teamA: "Manchester United",
//     teamB: "Manchester City",
//     time: "21/11/2023",
//     score: "15:1",
//     goal: "15",
//   },
//   {
//     teamA: "Manchester United",
//     teamB: "Manchester City",
//     time: "22/11/2023",
//     score: "15:1",
//     goal: "15",
//   },
//   {
//     teamA: "Manchester United",
//     teamB: "Manchester City",
//     time: "23/11/2023",
//     score: "15:1",
//     goal: "15",
//   },
// ];
// export default function PlayerGoalTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }}>
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
//               Trận
//             </TableCell>
//             <TableCell
//               align="center"
//               sx={{ color: "success.main", fontWeight: "bold" }}
//             >
//               Tỉ số
//             </TableCell>
//             <TableCell
//               align="center"
//               sx={{ color: "success.main", fontWeight: "bold" }}
//             >
//               Số bàn thắng ghi được
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {mockGoal.map((row) => (
//             <TableRow
//               key={row.time}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.time}: {row.teamA} vs {row.teamB}
//               </TableCell>
//               <TableCell align="center">{row.score}</TableCell>
//               <TableCell align="center">{row.goal}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

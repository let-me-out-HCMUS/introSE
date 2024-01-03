/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

const headerStyle = { color: "success.main", fontWeight: "bold" };

function ClubTable({ clubs }) {
  return (
    <TableContainer component={Paper} sx={{ ml: 8, mr: 8 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{/* Logo */}</TableCell>
            <TableCell sx={headerStyle}>Câu lạc bộ</TableCell>
            <TableCell sx={headerStyle}>Sân nhà</TableCell>
            <TableCell>{/* Navigation link */}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clubs.map((club) => (
            <TableRow key={club.id}>
              <TableCell>
                <Avatar alt={club.name} src={club.logo} />
              </TableCell>
              <TableCell>{club.name}</TableCell>
              <TableCell>{club.stadium}</TableCell>
              <TableCell sx={headerStyle} align="right">
                <Link to={`/clubs/${club.id}`}>
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

export default ClubTable;

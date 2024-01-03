import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { clubsMock } from "../mocks/clubs";
import MatchRound from "../features/schedule/MatchRound";
import generateSchedule from "../utils/schedule";

export default function NestedList() {
  const [clubs, setClubs] = useState([]);
  const [isSeasonStarted, setIsSeasonStarted] = useState(true);
  const [matchesInfo, setMatchesInfo] = useState([]);

  // load matches information
  useEffect(() => {
    setClubs(clubsMock);

    const matches = generateSchedule(clubsMock);
    setMatchesInfo(matches);
  }, [clubs]);

  const handleRegenerateSchedule = () => {
    const matches = generateSchedule(clubsMock);
    setIsSeasonStarted(false);
    setMatchesInfo(matches);

    toast.success("Tạo lịch thi đấu thành công");
  };


  return (
    <>
      {!isSeasonStarted &&
        <>
          <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              className="text-3xl"
              component="div"
              id="nested-list-subheader"
            >
              Thông tin các trận đấu
            </ListSubheader>
          }
          >
            {matchesInfo.map((matches, index) => {
              return <MatchRound key={index} matches={matches} matchId={index + 1} />;
            })}
          </List>
          <div className="flex justify-center mt-5">
            <Stack spacing={3} direction="row">
              <Button onClick={handleRegenerateSchedule} size="large" variant="contained">Tạo lại</Button>
              <Button size="large" variant="contained" color="success">Lưu</Button>
            </Stack>
          </div>
        </>
        }
      {
        isSeasonStarted &&
        <>
          <div className="flex justify-center py-10">
            <p className="text-5xl uppercase text-gray-600 font-bold">Nhấn tạo lịch để bắt đầu mùa giải</p>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleRegenerateSchedule} size="large" variant="contained">Tạo lịch</Button>
          </div>
        </>
      }
    </>
  );
}

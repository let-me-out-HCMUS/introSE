import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";

import MatchRound from "../features/schedule/MatchRound";
import generateSchedule from "../utils/schedule";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createMatch } from "../services/apiMatches";
import { getClubs } from "../services/apiClubs";

import {convertDateFormatFromInput} from "../utils/convertDateFormat";

export default function NestedList() {
  const {mutate} = useMutation({
    mutationFn: async (data) => {
      const promiseArray = [];

      for (let i = 0; i < data.matches.length; i++) {
        promiseArray.concat(promiseArray, data.matches[i].map(match => {
          return createMatch({
            firstClub: match.firstClub,
            secondClub: match.secondClub,
            time: convertDateFormatFromInput(match.time),
            stadium: match.stadium,
          });
        }));
      }

      await Promise.all(promiseArray);
    },
    onSuccess: () => {
      toast.success("Tạo lịch thi đấu thành công");
    },
    onError: () => {
      toast.error("Tạo lịch thi đấu thất bại");
    },
  })

  const {data: clubsFromApi} = useQuery(["clubs"], getClubs, {
    staleTime: Infinity,
  });

  const [clubs, setClubs] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [isSeasonStarted, setIsSeasonStarted] = useState(true);
  const [matchesInfo, setMatchesInfo] = useState([]);
  const {register, handleSubmit, formState: {errors}} = useForm();

  const registerOpts = {
    startDate: {
      required: 'Ngày bắt đầu không được để trống',
      validate: {
        isValidStartDate: (value) => {
          const startDate = new Date(value);
          const currentDate = new Date();
          return startDate < currentDate ? 'Ngày bắt đầu phải lớn hơn ngày hiện tại' : true;
        }
      }
    },
  }

  const handleSaveSchedule = () => {
    mutate({matches: matchesInfo});
  }

  const onSubmit = (data) => {
    setStartDate(data.startDate);
    setIsSeasonStarted(true);
    handleRegenerateSchedule(data.startDate);
    toast.success("Bắt đầu mùa giải thành công");
  }

  // load matches information
  useEffect(() => {
    if (!clubsFromApi) return;

    setClubs(clubsFromApi.data.club);

    const matches = generateSchedule(clubs, startDate);
    setMatchesInfo(matches);
  }, [clubsFromApi]);

  const handleRegenerateSchedule = (startDate) => {
    const matches = generateSchedule(clubs, startDate);
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
              <Button onClick={() => {handleRegenerateSchedule(startDate)}} size="large" variant="contained">Tạo lại</Button>
              <Button onClick={handleSaveSchedule} size="large" variant="contained" color="success">Lưu</Button>
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
            <div className="flex flex-col mr-10">
              <TextField id="standard-basic" InputLabelProps={{shrink: true}} {...register("startDate", registerOpts.startDate)} type='date' label="Chọn ngày bắt đầu giải đấu" variant="filled" />
              {
                errors.startDate && <span className='text-red-500 text-xs'>{errors.startDate.message}</span>
              }
            </div>
            <Button onClick={handleSubmit(onSubmit)} size="large" variant="contained">Tạo lịch</Button>
          </div>
        </>
      }
    </>
  );
}

import { useState, useEffect } from "react";
// import { trandau } from "../mocks/match-result";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getMatchById } from "../services/apiMatch";
import {
  getGoalsMatch,
  updateGoal,
  addGoal,
  deleteGoal,
} from "../services/apiGoal";

import CustomDialog from "../features/common/Dialog";
import FormAddGoal from "../features/match-result/FormAddGoal";
import FormEditGoal from "../features/match-result/FormEditGoal";
import { Button } from "@mui/material";

/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
export default function MatchResult() {
  const id = useParams().id;
  const { data: matchData } = useQuery([`match-${id}`], () => getMatchById(id));
  const { data: goalData } = useQuery([`goal-${id}`], () => getGoalsMatch(id));


  // console.log('match',matchData);
  // console.log('goal',goalData);
  

  const { mutate: addG } = useMutation({
    mutationFn: async (data) => {
      const res = await addGoal(data);
      return res;
    },
    onSuccess: (goal) => {
      goal.player = addedGoalPlayer;
      if (selectedClub === match?.firstClub._id)
        setBanthang1([...Banthang1, goal]);
      else setBanthang2([...Banthang2, goal]);
      toast.success("Thêm thành công");
    },
    onError: () => {
      toast.error("Thêm thất bại");
    },
  });

  const { mutate: updateG } = useMutation({
    mutationFn: (data) => {
      updateGoal(data.id, data);
    },
    onSuccess: () => {
      toast.success("Lưu thành công");
    },
    onError: () => {
      toast.error("Lưu thất bại");
    },
  });

  const { mutate: deleteG } = useMutation({
    mutationFn: (id) => {
      deleteGoal(id);
    },
    onSuccess: () => {
      toast.success("Xoá thành công");
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  const [match, setMatch] = useState(null);

  const [Doi1, setDoi1] = useState("");
  const [Doi2, setDoi2] = useState("");
  const [Banthang1, setBanthang1] = useState([]);
  const [Banthang2, setBanthang2] = useState([]);
  const [time, setTime] = useState(new Date());
  
  const [addedGoalPlayer, setAddedGoalPlayer] = useState(null);

  useEffect(() => {
    if (matchData) {
      setMatch(matchData);
      setDoi1(matchData.firstClub.clubName);
      setDoi2(matchData.secondClub.clubName);
      setTime(new Date(matchData.time));

      // console.log(time);
      // console.log(matchData);
    }
  }, [matchData]);

  useEffect(() => {
    if (goalData) {
      setBanthang1(
        goalData.filter((item) => item.player.club.clubName === Doi1),
      );
      setBanthang2(
        goalData.filter((item) => item.player.club.clubName === Doi2),
      );
    }
  }, [goalData]);

  // console.log('bt1',Banthang1)
  const [editedGoal1, setEditedGoal1] = useState({});
  const [selectedClub, setSelectedClub] = useState(null);

  const [openingDialog, setOpeningDialog] = useState(false);
  const [openingDialogE, setOpeningDialogE] = useState(false);

  const [isEditting, setIsEditting] = useState(false);
  const today = new Date();
  const isPlayed = time ? today > time : false;

  const handleClose = () => {
    setOpeningDialog(false);
  };

  

  const handleCloseE = () => {
    setOpeningDialogE(false);
  };

  const addGoal1 = async (goal) => {
    // console.log(goal);
    const goalToSubmit = {
      firstClub: match?.firstClub.clubName,
      secondClub: match?.secondClub.clubName,
      player: goal.player.name,
      time: goal.time,
      goalType: goal.goalType,
      isOwnGoal: goal.isOwnGoal,
    };
    setOpeningDialog(false);
    addG(goalToSubmit);
    setAddedGoalPlayer(goal.player);
    
  };

  const deleteGoal1 = (clubid,id) => {
    // console.log(id);
    if (clubid === match?.firstClub._id)
    {
      // console.log('immediately')
      setBanthang1(Banthang1.filter((item) => item.id !== id));
    }
    else setBanthang2(Banthang2.filter((item) => item.id !== id));
    deleteG(id);
  };

  // Handle edit goal team 1
  const editGoal1 = (goal) => {
    const goalToSubmit = {
      goalType: goal.goalType,
      time: goal.time,
      id: goal.id,
    };
    updateG(goalToSubmit);
    goal.player = editedGoal1.player;
    if (selectedClub === match?.firstClub._id)
      setBanthang1((Banthang1) => {
        return Banthang1.map((item) => (item.id === goal.id ? goal : item));
      });
    else {
      setBanthang2((Banthang2) => {
        return Banthang2.map((item) => (item.id === goal.id ? goal : item));
      });
    }

    setOpeningDialogE(false);
  };

  return (
    <>
    <Button variant="contained" color="primary" size="large"  onClick={() => window.history.back()}>Trở lại</Button>
    <div className="flex w-auto justify-center pt-20">
      <CustomDialog
        title={"Thêm bàn thắng"}
        open={openingDialog}
        onClose={handleClose}
      >
        <FormAddGoal submitAdd={addGoal1} clubId={selectedClub} />
      </CustomDialog>

      

      <CustomDialog
        title={"Chỉnh sửa bàn thắng"}
        open={openingDialogE}
        onClose={handleCloseE}
      >
        <FormEditGoal submitEdit={editGoal1} goal={editedGoal1} />
      </CustomDialog>

      <div className="w-full bg-white py-8">
        <div className="ml-5 mt-4 block">
          <h1>
            Ngày {time.getDate()} - {time.getMonth() + 1}
          </h1>
          <h1>Sân vận động: {match?.stadium}</h1>
          {!isPlayed && <p>Trận đấu chưa diễn ra</p>}
        </div>
        <div className="mt-10 flex items-center justify-around">
          <div className=" w-40 text-center">
            <img
              src = {match?.firstClub.image}
              alt="logo"
              className=" m-auto h-20 w-20"
            />
            <h1 className="mt-4 font-bold">{Doi1}</h1>
          </div>
          <div className=" text-5xl">
            {isPlayed ? (
              <div className="w-full">
                {Banthang1?.filter((goal) => !goal.isOwnGoal).length +
                  Banthang2?.filter((goal) => goal.isOwnGoal).length}{" "}
                -{" "}
                {Banthang2?.filter((goal) => !goal.isOwnGoal).length +
                  Banthang1?.filter((goal) => goal.isOwnGoal).length}
              </div>
            ) : (
              "-"
            )}
          </div>
          <div className="w-40 text-center">
            <img
              src = {match?.secondClub.image}
              alt="logo"
              className=" m-auto h-20 w-20"
            />
            <h1 className="mt-4 font-bold">{Doi2}</h1>
          </div>
        </div>

        {isPlayed && (
          <div className="mt-10 flex justify-between px-8">
            <ul className=" w-2/5">
              {Banthang1.map((item) => (
                <li
                  key={item.id}
                  className="flex space-x-2 text-sm font-semibold text-gray-500"
                >
                  <div>{item.player.name}</div>
                  <div>{item.time}'</div>
                  <div>{item.goalType}</div>
                  {item.isOwnGoal && <div>(og)</div>}
                  {isEditting && (
                    <>
                      <button
                        className=" text-green-600"
                        onClick={() => {
                          setSelectedClub(match?.firstClub._id);
                          setEditedGoal1(item);
                          setOpeningDialogE(true);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className=" text-red-600"
                        onClick={() => {
                          setSelectedClub(match?.firstClub._id);
                          deleteGoal1(match?.firstClub._id,item.id);
                        }}
                      >
                        Xoá
                      </button>
                    </>
                  )}
                </li>
              ))}
              {isEditting && (
                <button
                  onClick={() => {
                    setSelectedClub(match?.firstClub._id);
                    setOpeningDialog(true);
                  }}
                  className="btn"
                >
                  +
                </button>
              )}
            </ul>
            <div>⚽</div>
            <ul className=" w-2/5">
              {Banthang2.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-end space-x-2 text-sm font-semibold text-gray-500"
                >
                  <div>{item.player.name}</div>
                  <div>{item.time}'</div>
                  <div>{item.goalType}</div>
                  {item.isOwnGoal && <div>(og)</div>}
                  {isEditting && (
                    <>
                      <button
                        className=" text-green-600"
                        onClick={() => {
                          setSelectedClub(match?.secondClub._id);
                          setEditedGoal1(item);
                          setOpeningDialogE(true);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className=" text-red-600"
                        onClick={() => {
                          setSelectedClub(match?.secondClub._id);
                          deleteGoal1(match?.secondClub._id,item.id);
                        }}
                      >
                        Xoá
                      </button>
                    </>
                  )}
                </li>
              ))}
              {isEditting && (
                <button
                  onClick={() => {
                    setSelectedClub(match?.secondClub._id);
                    setOpeningDialog(true);
                  }}
                  className="btn float-right"
                >
                  +
                </button>
              )}
            </ul>
          </div>
        )}

        {isPlayed && (
          <button
            className="btn m-auto my-4 block"
            onClick={() => setIsEditting(!isEditting)}
          >
            {isEditting ? "Lưu" : "Chỉnh sửa"}
          </button>
        )}
      </div>
    </div>
    </>
  );
}

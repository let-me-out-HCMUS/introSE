import { useState, useEffect } from "react";
import { trandau } from "../mocks/match-result";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getMatchById } from "../services/apiMatch";
import { getGoalsMatch, updateGoal } from "../services/apiGoal";

import CustomDialog from "../features/common/Dialog";
import FormAddGoal from "../features/match-result/FormAddGoal";
import FormEditGoal from "../features/match-result/FormEditGoal";

/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
export default function MatchResult() {
  const id = useParams().id;
  const { data: matchData } = useQuery(["match"], () => getMatchById(id));
  const { data: goalData } = useQuery(["goal"], () => getGoalsMatch(id));

  const { mutate: updateG } = useMutation({
    mutationFn: (data) => {
      updateGoal(data.id,data);
    },
    onSuccess: () => {
      toast.success("Lưu thành công");
    },
    onError: () => {
      toast.error("Lưu thất bại");
    },
  });
  

  const [match, setMatch] = useState(null);

  const [Doi1, setDoi1] = useState("");
  const [Doi2, setDoi2] = useState("");
  const [Banthang1, setBanthang1] = useState([]);
  const [Banthang2, setBanthang2] = useState([]);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (matchData) {
      setMatch(matchData);
      setDoi1(matchData.firstClub.clubName);
      setDoi2(matchData.secondClub.clubName);
      setTime(new Date(matchData.time));
      // console.log(time);
      // console.log(match);
    }
  }, [matchData]);

  useEffect(() => {
    setBanthang2(trandau.Banthang2);
  }, []);

  // console.log(item.player.club.clubName, Doi2
  // console.log(goalData)

  useEffect(() => {
    if (goalData) {

      setBanthang1(goalData.filter((item) =>item.player.club.clubName === Doi2));
      // setBanthang1(goalData)
      // setBanthang2(goalData.filter((item) => item.clubId === match?.secondClub._id));
    }
    // console.log('bt1',Banthang1)
    // setBanthang1(trandau.Banthang1);
  }, [goalData]);

  // console.log('bt1',Banthang1)
  const [editedGoal1, setEditedGoal1] = useState({});

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

  const addGoal1 = (goal) => {
    console.log(goal);
    goal.id = Banthang1.length + 1;
    setBanthang1([...Banthang1, goal]);
    setOpeningDialog(false);
  };

  const deleteGoal1 = (id) => {
    // console.log(id);
    setBanthang1(Banthang1.filter((item) => item.id !== id));
  };

  // Handle edit goal team 1
  const editGoal1 = (goal) => {
    // goal.firstClub = match?.firstClub.clubName;
    // goal.secondClub = match?.secondClub.clubName;
    // goal.player = goal.player.name;
    console.log('goal edit',goal);
    updateG(goal,123);
    setBanthang1((Banthang1) => {
      const index = Banthang1.findIndex((item) => item.id === goal.id);
      const newBanthang1 = [...Banthang1];
      newBanthang1[index] = goal;
      return newBanthang1;
    });
    
    setOpeningDialogE(false);
  };

  return (
    <div className="flex w-auto justify-center pt-32">
      {/* <h1 className="mb-10">{time}</h1>
            <h1 className="mb-10">{test}</h1>
            <h1>{isPlayed() ? time : test} {id}</h1> */}
      <CustomDialog
        title={"Thêm bàn thắng"}
        open={openingDialog}
        onClose={handleClose}
      >
        <FormAddGoal submitAdd={addGoal1} clubId={match?.firstClub._id} />
      </CustomDialog>

      <CustomDialog
        title={"Chỉnh sửa bàn thắng"}
        open={openingDialogE}
        onClose={handleCloseE}
      >
        <FormEditGoal submitEdit={editGoal1} goal={editedGoal1} />
      </CustomDialog>

      <div className="w-full bg-white">
        <div className="block ml-5">
          <h1>Ngày {time.getDate()} - {time.getMonth()+1}</h1>
          <h1>Sân vận động: {match?.stadium}</h1>
          {!isPlayed && <p>Trận đấu chưa diễn ra</p>}
        </div>
        <div className="mt-10 flex items-center justify-around">
          <div className=" text-center w-40">
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png"
              alt="logo"
              className=" m-auto h-20 w-20"
            />
            <h1 className="mt-4 font-bold">{Doi1}</h1>
          </div>
          <div className=" text-5xl tracking-[20px]">
            {isPlayed ? <div className="w-full text-center">{match?.result}</div> : "-"}
          </div>
          <div className="text-center w-40">
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_96x96.png"
              alt="logo"
              className=" m-auto h-20 w-20"
            />
            <h1 className="mt-4 font-bold">{Doi2}</h1>
          </div>
        </div>

        {isPlayed && (
          <div className="mt-10 flex justify-between px-8">
            <ul className=" w-2/5">
              {Banthang1.map((item, index) => (
                <li
                  key={index}
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
                          setEditedGoal1(item);
                          setOpeningDialogE(true);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className=" text-red-600"
                        onClick={() => deleteGoal1(item.id)}
                      >
                        Xoá
                      </button>
                    </>
                  )}
                </li>
              ))}
              {isEditting && (
                <button onClick={() => setOpeningDialog(true)} className="btn">
                  +
                </button>
              )}
            </ul>
            <div>⚽</div>
            <ul className=" w-2/5">
              {Banthang2.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-end space-x-2 text-sm font-semibold text-gray-500"
                >
                  <div>{item.Ten}</div>
                  <div>{item.ThoiDiem}'</div>
                  <div>{item.Loai}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isPlayed && (
          <button
            className="btn m-auto block"
            onClick={() => setIsEditting(!isEditting)}
          >
            {isEditting ? "Lưu" : "Chỉnh sửa"}
          </button>
        )}
      </div>
    </div>
  );
}

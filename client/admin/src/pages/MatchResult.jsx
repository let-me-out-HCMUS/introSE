import { useState, useEffect } from "react";
import { trandau } from "../mocks/match-result";
import CustomDialog from "../features/common/Dialog";
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getMatchById } from "../services/apiMatch";
import FormAddGoal from "../features/match-result/FormAddGoal";
import FormEditGoal from "../features/match-result/FormEditGoal";

/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
export default function MatchResult() {
  const id = useParams().id;
  const { data } = useQuery(["match"], () => getMatchById(id));

  const [match, setMatch] = useState(null);

  const [Doi1, setDoi1] = useState("");
  const [Doi2, setDoi2] = useState("");
  const [Banthang1, setBanthang1] = useState(trandau.Banthang1);
  const [Banthang2, setBanthang2] = useState([]);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (data) {
      setMatch(data);
      setDoi1(data.firstClub.clubName);
      setDoi2(data.secondClub.clubName);
      setTime(new Date(data.time));
      // console.log(time);
      // console.log(match);
    }
  }, [data]);

  
  console.log(time) ;
  

  // useEffect(() => {
  //   setDoi1(match?.firstClub?.clubName);
  //   setDoi2(trandau.Doi2);
  // }, [match]);

  useEffect(() => {
    setBanthang2(trandau.Banthang2);
  }, []);

  useEffect(() => {
    setBanthang1(trandau.Banthang1);
  }, []);

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

  const editGoal1 = (goal) => {
    console.log(goal);
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
        <FormAddGoal submitAdd={addGoal1} />
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
                  <div>{item.Ten}</div>
                  <div>{item.ThoiDiem}'</div>
                  <div>{item.Loai}</div>
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

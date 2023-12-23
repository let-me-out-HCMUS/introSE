import { useState, useEffect } from "react";
import { trandau } from "../mocks/match-result";
import CustomDialog from "../features/common/Dialog";

import FormAddGoal from "../features/match-result/FormAddGoal";
import FormEditGoal from "../features/match-result/FormEditGoal";

/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
export default function MatchResult({ id }) {
  // const date = new Date();
  // const time = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  // var test = new Date(2023,0,1)
  // console.log(test)

  // const  isPlayed = () => {
  //     if(date> test){
  //         return true
  //     }
  //     return false
  // }
  const [editedGoal1, setEditedGoal1] = useState({});

  const [openingDialog, setOpeningDialog] = useState(false);
  const [openingDialogE, setOpeningDialogE] = useState(false);

  const handleClose = () => {
    setOpeningDialog(false);
  };

  const handleCloseE = () => {
    setOpeningDialogE(false);
  };

  const [Doi1, setDoi1] = useState("");
  const [Doi2, setDoi2] = useState("");

  const [Banthang1, setBanthang1] = useState(trandau.Banthang1);
  const [Banthang2, setBanthang2] = useState([]);

  useEffect(() => {
    setDoi1(trandau.Doi1);
    setDoi2(trandau.Doi2);
  }, []);

  useEffect(() => {
    setBanthang2(trandau.Banthang2);
  }, []);

  useEffect(() => {
    setBanthang1(trandau.Banthang1);
  }, []);

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
      <div className="w-full bg-white">
        <div className="flex-start flex">
          <h1>Ngày</h1>
          <p>21/12 - {id}</p>
        </div>
        <div className="mt-10 flex items-center justify-around">
          <div className=" text-center">
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png"
              alt="logo"
              className=" m-auto h-20 w-20"
            />
            <h1 className="mt-4 font-bold">{Doi1}</h1>
          </div>
          <div className=" text-5xl tracking-[20px]">
            {Banthang1.length} - {Banthang2.length}
          </div>
          <div className="text-center">
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_96x96.png"
              alt="logo"
              className=" m-auto h-20 w-20"
            />
            <h1 className="mt-4 font-bold">{Doi2}</h1>
          </div>
        </div>

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
                <button
                  className=" text-red-600"
                  onClick={() => deleteGoal1(item.id)}
                >
                  Xoá
                </button>
                <button
                  className=" text-blue-600"
                  onClick={() => {setEditedGoal1(item) ;setOpeningDialogE(true)}}
                >
                  Sửa
                </button>
              </li>
            ))}

            <button onClick={() => setOpeningDialog(true)} className="btn">
              +
            </button>
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
      </div>
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
    </div>
  );
}

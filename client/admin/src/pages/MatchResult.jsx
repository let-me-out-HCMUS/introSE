import { useState, useEffect } from "react";
import { trandau } from "../mocks/match-result";
import CustomDialog from "../features/common/Dialog";
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

  const [openingDialog, setOpeningDialog] = useState(false);

  const handleClose = () => {
    setOpeningDialog(false);
    
  };

  const [Doi1, setDoi1] = useState("");
  const [Doi2, setDoi2] = useState("");

  const [Banthang1, setBanthang1] = useState([]);
  const [Banthang2, setBanthang2] = useState([]);

  

  useEffect(() => {
    setDoi1(trandau.Doi1);
    setDoi2(trandau.Doi2);
  }, []);

  useEffect(() => {
    setBanthang1(trandau.Banthang1);
  }, []);

  useEffect(() => {
    setBanthang2(trandau.Banthang2);
  }, []);

  

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
          <div className=" text-5xl tracking-[20px]">{Banthang1.length} - {Banthang2.length}</div>
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
              </li>
            ))}

            {/* <form action="">
              <div className="field">
                <label htmlFor="">Cầu thủ</label>
                <input type="text" className="w-10"/>
              </div>
              <div className="field">
                <label htmlFor="">Cầu thủ</label>
                <input type="text" className="w-10"/>
              </div>
              <div className="field">
                <label htmlFor="">Cầu thủ</label>
                <input type="text" className="w-10"/>
              </div>
            </form> */}
            <button onClick={()=> setOpeningDialog(true)}>
              Add 
            </button>
            <CustomDialog title={'Thêm bàn thắng'} open={openingDialog} onClose={handleClose}>
              <h1>test</h1>
            </CustomDialog>
            
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
    </div>
  );
}

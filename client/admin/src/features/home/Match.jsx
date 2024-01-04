/* eslint-disable react/prop-types */
import { LuClock4 } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const Match = ({matchInfo}) => {
  return (
    <div className="h-[100px] mb-5 text-gray-500 flex justify-between items-center px-10 rounded-md bg-white">
          <div className="flex w-[60%] leading-[45px]">
            <div className="flex w-5/12 cursor-pointer">
                <img className="rounded-full mr-3 w-[45px] h-[45px]" src={matchInfo.firstClubLogo} alt="logo" />
                <span>{matchInfo.firstClub}</span>
            </div>
            <span className="px-8 font-extrabold text-blue-800">VS</span>
            <div className="flex cursor-pointer">
                <img className="rounded-full mr-3 w-[45px] h-[45px]" src={matchInfo.secondClubLogo} alt="logo" />
                <span>{matchInfo.secondClub}</span>
            </div>
          </div>
          <div className="flex w-1/4 leading-[45px] justify-between">
            <div className="flex">
              <LuClock4 className="h-[45px] mr-1" />
              <span>{matchInfo.time}</span>
            </div>
            <div className="flex">
              <IoLocationOutline className="h-[45px] mr-1" />
              <span>{matchInfo.stadium}</span>
            </div>
          </div>
          {
            matchInfo.matchId &&
            <Link to={`/match-result/${matchInfo.matchId}`} className="cursor-pointer">
              Xem kết quả &rarr;
            </Link>
          }
        </div>
  )
}

export default Match
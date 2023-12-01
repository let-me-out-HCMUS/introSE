import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { matches } from "../mocks/homePage";
import Match from "../features/home/Match";
import BannerImage from "../assets/images/home_banner.png";

function Home() {
  const [matchesInfo, setMatchesInfo] = useState([]);


  // load matches information
  useEffect(() => {
    setMatchesInfo(matches);
  }, [matchesInfo])

  return (
    <div className="px-16 py-16 mx-auto">
      <div className="bg-green-800 flex w-full h-80">
        <div className="px-10 py-10">
          <img width={350} height={350} src={BannerImage} alt="tuyenVN" />
        </div>
        <div className="py-10 flex flex-col justify-between items-end">
          <p className="text-white text-6xl uppercase font-bold">Giải bóng đá vô địch quốc gia 2023</p>
          <button className="rounded-full mr-32 w-32 px-4 py-2 bg-white text-green-700 font-bold">Xem ngay &rarr;</button>
        </div>
      </div>
      <div className="mt-14 px-10">
          <div className="flex justify-between">
            <p className="font-bold">Các trận đấu gần nhất</p>
            <Link className="text-gray-600" to="/matches">Xem tất cả</Link>
          </div>
      </div>
      <div className="pt-10">
        {matchesInfo.map((match, index) => {
          // TODO: change key from index to matchId
          return <Match key={index} matchInfo={match} />
        })}
      </div>
    </div>
  );
}

export default Home;

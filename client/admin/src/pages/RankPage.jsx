import { useEffect, useState } from "react";
import RankTable from "../features/ranking/RankTable.jsx";
import { ranks } from "../mocks/rankPage.js";

function RankPage() {
  const [rankInfo, setRankInfo] = useState([]);

  useEffect(() => {
    const fetchRankInfo = () => {
      setRankInfo(ranks.sort((a, b) => b.points - a.points));
    };

    fetchRankInfo();
  }, [rankInfo]);

  return (
    <div className="flex justify-center py-16	">
      <RankTable rankedClubs={rankInfo} />
    </div>
  );
}

export default RankPage;

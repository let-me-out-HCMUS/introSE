import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRule } from "../services/apiRule.js";
import { getClubs } from "../services/apiClubs.js";
import RankTable from "../features/ranking/RankTable.jsx";
// import { ranks } from "../mocks/rankPage.js";
import ranking from "../utils/ranking.js";
function RankPage() {
  const [rankInfo, setRankInfo] = useState([]);
  
  const { data: ruleData, refetch } = useQuery(["rule"], () => getRule());
  const { data: clubsData } = useQuery(["clubs"], () => getClubs());
  
  useEffect(() => {
    refetch();
    const fetchRankInfo = (rule) => {
      // setRankInfo(ranks.sort((a, b) => b.points - a.points));
      if (ranks)  
      {
        console.log('ranks',ranks);
        ranking(ranks,rule).then((res) => setRankInfo(res));
      }
      // .then((res) => setRankInfo(res));
    };

    var ranks = []
    if (clubsData){
      ranks = clubsData.data.club
      // console.log(ranks);
    }

    if (ruleData) {
      const rule = ruleData
      fetchRankInfo(rule);
    }

    
  }, [rankInfo, ruleData]);

  // console.log(rankInfo);

  return (
    <div className="flex justify-center py-16	">
      <RankTable rankedClubs={rankInfo} />
    </div>
  );
}

export default RankPage;

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRule } from "../services/apiRule.js";
import RankTable from "../features/ranking/RankTable.jsx";
import { ranks } from "../mocks/rankPage.js";
import ranking from "../utils/ranking.js";
function RankPage() {
  const [rankInfo, setRankInfo] = useState([]);

  const { data: ruleData } = useQuery(["rule"], () => getRule());

  useEffect(() => {
    const fetchRankInfo = (rule) => {
      // setRankInfo(ranks.sort((a, b) => b.points - a.points));
      console.log('rule',rule);
      setRankInfo(ranking(ranks,rule))
      // .then((res) => setRankInfo(res));
    };

    if (ruleData) {
      const rule = ruleData
      // console.log(rule);
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

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRule } from "../services/apiRule.js";
import { getClubs } from "../services/apiClubs.js";
import RankTable from "../features/ranking/RankTable.jsx";
// import { ranks } from "../mocks/rankPage.js";
import ranking from "../utils/ranking.js";
function RankPage() {
  const [rankInfo, setRankInfo] = useState([]);

  const { data: ruleData } = useQuery(["rule"], () => getRule(), {
    staleTime: Infinity,
  });
  const { data: clubsData } = useQuery(["clubs"], () => getClubs(), {
    staleTime: Infinity,
  });

  useEffect(() => {
    const fetchRankInfo = (rule) => {
      if (ranks) {
        // console.log('ranks',ranks);
        ranking(ranks, rule).then((res) => setRankInfo(res));
      }
    };

    var ranks = [];
    if (clubsData) {
      ranks = clubsData?.data.club;
      // console.log(clubsData)
    }

    if (ruleData) {
      const rule = ruleData;
      fetchRankInfo(rule);
    }
  }, [clubsData, ruleData]);

  // console.log(rankInfo);

  return (
    <div className="flex justify-center py-16	">
      <RankTable rankedClubs={rankInfo} />
    </div>
  );
}

export default RankPage;

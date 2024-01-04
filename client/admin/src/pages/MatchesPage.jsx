import { useQuery } from "@tanstack/react-query"
import { getAllMatches } from "../services/apiMatches"
import { useEffect, useState } from "react"
import Pagination from '@mui/material/Pagination';
import Match from "../features/home/Match";

import {convertDateFormatFromISODate } from "../utils/convertDateFormat"

const MatchesPage = () => {
  const {data} = useQuery(["matches"], getAllMatches, {
    staleTime: Infinity,
  })
  const [showMatches, setShowMatches] = useState([])
  const [maxPage, setMaxPage] = useState(10)

  useEffect(() => {
    if (!data)
      return;

    // get the first 10 matches
    setShowMatches(data.data.matches.slice(0, 10))
    setMaxPage(Math.ceil(data.data.matches.length / 10))
  }, [data])

  const handlePageChange = (event, value = 1) => {
    setShowMatches(data.data.matches.slice((value - 1) * 10, value * 10))
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        {showMatches.map((match) => {
          const matchRender = {
            firstClub: match.firstClub.clubName,
            secondClub: match.secondClub.clubName,
            firstClubLogo: match.firstClub.image,
            secondClubLogo: match.secondClub.image,
            time: convertDateFormatFromISODate(new Date(match.time)),
            stadium: match.stadium,
            matchId: match._id,
          }
          
          return <Match key={match._id} matchInfo={matchRender} />
        })}
      </div>
      <div className="flex justify-center">
        <Pagination onChange={(event, pageNumber) => handlePageChange(event, pageNumber)} count={maxPage} color="primary" />
      </div>
    </div>
  )
}

export default MatchesPage
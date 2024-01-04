import { useQuery } from "@tanstack/react-query";
import ClubTable from "../features/clubs/ClubTable";

import { getClubs } from "../services/apiClubs";
import { CircularProgress } from "@mui/material";

export default function ClubPage() {
  // use query to get clubs
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["clubs"],
    queryFn: getClubs,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col justify-center">
      <ClubTable clubs={data.club} />
    </div>
  );
}

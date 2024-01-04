import { useEffect, useState } from "react";
import { clubs as MockClubs } from "../mocks/clubPage";
import ClubTable from "../features/clubs/ClubTable";

export default function ClubPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = () => {
      setClubs(MockClubs);
    };

    fetchClubs();
  }, [clubs]);

  return (
    <div className="flex flex-col justify-center">
      <ClubTable clubs={clubs} />
    </div>
  );
}

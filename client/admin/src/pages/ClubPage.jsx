import { useEffect, useState } from "react";
import ClubTable from "../features/clubs/ClubTable";
import { clubs as MockClubs } from "../mocks/clubPage";

export default function ClubPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = () => {
      setClubs(MockClubs);
    };

    fetchClubs();
  }, [clubs]);

  return (
    <div className="flex justify-center px-16 py-16 	">
      <ClubTable clubs={clubs} />
    </div>
  );
}

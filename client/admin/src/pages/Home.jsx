import { toast } from "react-hot-toast";

const notify = () => toast.success("Hello World");

function Home() {
  // xu ly j do o day
  return (
    <div className="flex w-auto justify-center pt-32	">
      <button onClick={notify} className="border-8 bg-orange-400 p-20">
        Click thử xem
      </button>
    </div>
  );
}

export default Home;

import { useNavigate } from "react-router-dom";

const Leaderboard = ({ leaderboard }: any) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">Leaderboard</h1>
      <ul className="list-none bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        {leaderboard.map((entry: { name: string; attempts: number }, index: number) => (
          <li key={index} className="text-lg">
            {index + 1}. {entry.name} - {entry.attempts} pokušaja
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Povratak na menu
      </button>
    </div>
  );
};

export default Leaderboard;

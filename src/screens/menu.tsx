import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold mb-4">Memory Game</h1>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate("/newgame")}
      >
        Zaigraj igru
      </button>
      <button
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        onClick={() => navigate("/leaderboard")}
      >
        Leaderboard
      </button>
    </div>
  );
};

export default Menu;

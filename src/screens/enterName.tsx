import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterName = () => {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const startGame = () => {
    if (playerName.trim()) {
      navigate("/game", { state: { playerName } });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold mb-4">Unesite ime</h1>
      <input
        type="text"
        placeholder="Vaše ime"
        className="border border-white bg-white bg-opacity-80 p-3 rounded-lg text-center text-black w-64 focus:outline-none focus:ring-2 focus:ring-pink-500"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={startGame}
        disabled={!playerName.trim()}
      >
        Zaigraj
      </button>
    </div>
  );
};

export default EnterName;

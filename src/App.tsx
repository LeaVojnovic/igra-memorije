import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Menu from "./screens/menu";
import EnterName from "./screens/enterName";
import Game from "./screens/game";
import Leaderboard from "./screens/leaderboard";

function App() {

  const [leaderboard, setLeaderboard] = useState<{ name: string; attempts: number }[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/newgame" element={<EnterName />} />
      {/* leaderboard i setLeaderboard kao propovi */}
      <Route
        path="/game"
        element={<Game leaderboard={leaderboard} setLeaderboard={setLeaderboard} />}
      />
      <Route
        path="/leaderboard"
        element={<Leaderboard leaderboard={leaderboard} />}
      />
    </Routes>
  );
}

export default App;

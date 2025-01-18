import { useState, useEffect } from "react";
import Card from "./components/Card";

const icons = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐷"]; // Parovi ikona

//shuffle
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<"menu" | "enterName" | "game" | "leaderboard">("menu");
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<{ name: string; attempts: number }[]>([]);
  const [shuffledIcons, setShuffledIcons] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  // shuffle
  useEffect(() => {
    setShuffledIcons(shuffleArray(icons.concat(icons)));
  }, []);

  // upravljanje
  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }
    setFlippedCards((prev) => [...prev, index]);
  };

  // provjera
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      setAttempts((prev) => prev + 1);

      if (shuffledIcons[first] === shuffledIcons[second]) {
        setMatchedCards((prev) => [...prev, first, second]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, shuffledIcons]);


  useEffect(() => {
    if (matchedCards.length === icons.length * 2) {
      setLeaderboard((prev) => [...prev, { name: playerName, attempts }]);
      setTimeout(() => setCurrentScreen("leaderboard"), 2000);
    }
  }, [matchedCards]);

  const startGame = (name: string) => {
    setPlayerName(name);
    setCurrentScreen("game");
    setAttempts(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setShuffledIcons(shuffleArray(icons.concat(icons)));
  };

  // Main menu
  if (currentScreen === "menu") {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold mb-4">Memory Game</h1>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => setCurrentScreen("enterName")}
        >
          Zaigraj igru
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          onClick={() => setCurrentScreen("leaderboard")}
        >
          Leaderboard
        </button>
      </div>
    );
  }

  // name
  if (currentScreen === "enterName") {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold mb-4">Unesite ime</h1>
        <input
          type="text"
          placeholder="Vaše ime"
          className="border p-2 rounded w-64 text-center"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => playerName.trim() && startGame(playerName)}
          disabled={!playerName.trim()}
        >
          Zaigraj
        </button>
      </div>
    );
  }

  // ingame
  if (currentScreen === "game") {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Igra memorije</h1>
        <p className="text-lg">Igrač: {playerName}</p>
        <p className="text-lg">Pokušaji: {attempts}</p>
        <div className="grid grid-cols-4 gap-4">
          {shuffledIcons.map((icon, index) => (
            <Card
              key={index}
              icon={icon}
              isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  // leaderboarda
  if (currentScreen === "leaderboard") {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <ul className="list-none">
          {leaderboard
            .sort((a, b) => a.attempts - b.attempts)
            .map((entry, index) => (
              <li key={index} className="text-lg">
                {index + 1}. {entry.name} - {entry.attempts} pokušaja
              </li>
            ))}
        </ul>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => setCurrentScreen("menu")}
        >
          Povratak na menu
        </button>
      </div>
    );
  }

  return null;
}

export default App;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const icons = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐷"]; // Parovi ikona

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Game = ({ leaderboard, setLeaderboard }: { leaderboard: any[]; setLeaderboard: any }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = location.state?.playerName || "Nepoznato";
  const [shuffledIcons, setShuffledIcons] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState(false); // Flag za praćenje završetka igre

  // mjesanje karata
  useEffect(() => {
    startNewGame();
  }, []);

  // newgame
  const startNewGame = () => {
    setShuffledIcons(shuffleArray(icons.concat(icons)));
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setGameCompleted(false); 
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }
    setFlippedCards((prev) => [...prev, index]);
  };

  // provjera parova
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
    if (matchedCards.length === icons.length * 2 && !gameCompleted) {

      const updatedLeaderboard = [
        ...leaderboard,
        { name: playerName, attempts },
      ].sort((a, b) => a.attempts - b.attempts);

      setLeaderboard(updatedLeaderboard); 
      setGameCompleted(true); 
      setTimeout(() => {
        navigate("/leaderboard"); 
      }, 2000);
    }
  }, [matchedCards, leaderboard, navigate, playerName, attempts, setLeaderboard, gameCompleted]);

  // pronađeni parovi
  const pairsFound = matchedCards.length / 2;
  const totalPairs = icons.length;


  const handleReturnToMenu = () => {
    const confirmExit = window.confirm("Jeste li sigurni da želite prekinuti igru i vratiti se na izbornik?");
    if (confirmExit) {
      navigate("/");
    }
  };


  const handleRestartGame = () => {
    const confirmRestart = window.confirm("Jeste li sigurni da želite restartati igru?");
    if (confirmRestart) {
      startNewGame();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">Igra memorije</h1>
      <p className="text-lg">Igrač: {playerName}</p>
      <p className="text-lg">Pokušaji: {attempts}</p>
      <p className="text-lg text-green-500">
        Pronađeni parovi: {pairsFound} / {totalPairs}
      </p>
      {matchedCards.length === icons.length * 2 && (
        <p className="text-lg text-blue-500">Igra je završena! Preusmjeravanje...</p>
      )}
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
      <div className="flex gap-4 mt-6">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all"
          onClick={handleReturnToMenu}
        >
          Povratak na izbornik
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
          onClick={handleRestartGame}
        >
          Restartaj igru
        </button>
      </div>
    </div>
  );
};

export default Game;

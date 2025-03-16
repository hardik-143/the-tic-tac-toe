import "./fonts.css";
import "./App.scss";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import GameControls from "./components/GameControls";
import GameModeSelector from "./components/GameModeSelector";
import { useSelector } from "react-redux";
import HowToPlay from "./components/HowToPlay";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Game() {
  const { isGameFinished, gameStarted } = useSelector((state) => state.game);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-['Press_Start_2P'] text-white mb-8">
        Tic Tac Toe
      </h1>
      {!gameStarted ? (
        <div className="flex flex-col items-center gap-8">
          <GameModeSelector />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <GameStatus />
          <GameBoard />
          <GameControls isGameFinished={isGameFinished} />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
    </Router>
  );
}

export default App;

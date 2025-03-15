import "./fonts.css";
import "./App.scss";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import GameControls from "./components/GameControls";
import { useSelector } from "react-redux";

function App() {
  const { isGameFinished, currentMove, winningText } = useSelector(
    (state) => state.game
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1a1a1a]">
      <div className="relative p-8 rounded-2xl bg-[#2d2d2d] shadow-2xl border-2 border-[#4ecdc4]">
        <h2 className="text-xl text-center">The-Tic-Tac-Toe</h2>

        <GameStatus
          isGameFinished={isGameFinished}
          currentMove={currentMove}
          winningText={winningText}
        />

        <GameBoard />

        <GameControls isGameFinished={isGameFinished} />
      </div>
    </div>
  );
}

export default App;

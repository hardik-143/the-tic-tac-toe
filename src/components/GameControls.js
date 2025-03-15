import { useDispatch } from "react-redux";
import { restartGame } from "../store/gameSlice";

const GameControls = ({ isGameFinished }) => {
  const dispatch = useDispatch();

  return isGameFinished ? (
    <div className="flex justify-center py-3">
      <button
        onClick={() => dispatch(restartGame())}
        className="bg-[#4ecdc4] text-white px-6 py-3 rounded-lg shadow-lg border-2 border-[#45b7b0] hover:bg-[#45b7b0] active:transform active:scale-95 transition-all duration-150 ease-in-out"
      >
        ↺ New Game
      </button>
    </div>
  ) : null;
};

export default GameControls;

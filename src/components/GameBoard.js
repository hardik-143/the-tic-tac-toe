import _ from "lodash";
import clickSound from "../sounds/click-sound.mp3";
import { useDispatch, useSelector } from "react-redux";
import { makeMove, restartGame } from "../store/gameSlice";
import ButtonClick from "../sounds/buttons-click.mp3";

/**
 * Plays the button click sound
 */
const playButtonClick = () => {
  const sound = new Audio(ButtonClick);
  sound.volume = 0.3;
  sound.play();
};

const GameBoard = () => {
  const dispatch = useDispatch();
  const { moves, disabledGame } = useSelector((state) => state.game);

  const handleCellClick = (index) => {
    if (moves[index] || disabledGame) return;
    let sound = new Audio(clickSound);
    sound.loop = false;
    sound.play();
    dispatch(makeMove({ index }));
  };

  const handleRestart = () => {
    playButtonClick();
    dispatch(restartGame());
  };

  const handleBack = () => {
    playButtonClick();
    dispatch(restartGame({ resetMode: true }));
  };

  return (
    <div className="grid grid-cols-3 w-[210px] h-[210px] gap-3">
      {_.range(9).map((i) => (
        <button
          onClick={() => handleCellClick(i)}
          key={i}
          disabled={disabledGame}
          className={`text-dark inline-flex justify-center text-2xl items-center border border-dark select-none w-[62px] h-[62px] 
            ${i === 0 || i === 1 || i === 2 ? "border-t-0" : ""}
            ${i === 0 || i === 3 || i === 6 ? "border-l-0" : ""}
            ${i === 2 || i === 5 || i === 8 ? "border-r-0" : ""}
            ${i === 6 || i === 7 || i === 8 ? "border-b-0" : ""}
          `}
        >
          {moves[i]}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;

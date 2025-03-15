import { PLAYER_NAME } from "./constants";

const GameStatus = ({ isGameFinished, currentMove, winningText }) => {
  return (
    <>
      {!isGameFinished ? (
        <p className="text-center pb-3">
          Player {PLAYER_NAME[currentMove]}'s Turn
        </p>
      ) : null}

      {winningText && (
        <div className="flex justify-center py-3">
          <div className="text-dark">{winningText}</div>
        </div>
      )}
    </>
  );
};

export default GameStatus;

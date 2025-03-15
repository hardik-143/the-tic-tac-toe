import { useSelector } from "react-redux";

const GameStatus = () => {
  const { isGameFinished, currentMove, winningText, player1Name, player2Name } =
    useSelector((state) => state.game);

  const getCurrentPlayerName = () => {
    return currentMove === 0 ? player1Name : player2Name;
  };

  return (
    <>
      {!isGameFinished ? (
        <p className="text-center pb-3 font-['Press_Start_2P'] text-sm">
          {getCurrentPlayerName()}'s Turn
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

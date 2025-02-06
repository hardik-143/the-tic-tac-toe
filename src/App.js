import "./fonts.css";
import "./App.css";
import _ from "lodash";
import { useEffect, useState } from "react";
import GameDraw from "./sounds/game-draw.mp3";
import GameFinished from "./sounds/game-finished.mp3";
import clickSound from "./sounds/click-sound.mp3";
function App() {
  const possibleResults = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const playerName = {
    0: "X",
    1: "O",
  };
  const [winningText, setWinningText] = useState("");
  const [disabledGame, setDisabledGame] = useState(false);
  const [moves, setMoves] = useState({});
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const restartGame = () => {
    setMoves({});
    setIsGameFinished(false);
    setWinningText("");
    setDisabledGame(false);
    setIsDraw(false);
  }

  const playFinishedSound = (fromDraw) => {
    const _isDraw = fromDraw || isDraw;
    let sound = new Audio(_isDraw ? GameDraw : GameFinished);
    sound.loop = false;
    sound.play();
  }
  useEffect(() => {
    if (_.keys(moves).length < 5) return;
    const winner = possibleResults.find((result) => {
      const [a, b, c] = result;
      return moves[a] && moves[a] === moves[b] && moves[a] === moves[c];
    });
    if (winner) {
      playFinishedSound();
      setIsGameFinished(true);
      setWinningText(`${moves[winner[0]]} wins! 🎉`);
      setDisabledGame(true);
    } else {
      if (_.keys(moves).length === 9) {
        playFinishedSound(true);
        setIsGameFinished(true);
        setIsDraw(true);
        setWinningText("It's a draw! 🤝");
        setDisabledGame(true);
      }
    }
    // eslint-disable-next-line
  }, [moves]);
  const [currentMove, setCurrentMove] = useState(0); // 0 = X, 1 = O
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#EEF296]">
      <div className="relative">
        <h2 className="text-xl text-center pb-3">The-Tic-Tac-Toe</h2>
        {
          !isGameFinished ? (
            <p
            className={`text-center pb-3`}
            >
          Player {playerName[currentMove]}'s Turn
        </p>
        ) : null
      }
        <div>
          <div className="grid grid-cols-3 w-[210px] h-[210px] gap-3">
            {_.range(9).map((i) => {
              return (
                <button
                  onClick={() => {
                    if (moves[i]) return;
                    let sound = new Audio(clickSound);
                    sound.loop = false;
                    sound.play();
                    setMoves((prev) => {
                      return {
                        ...prev,
                        [i]: currentMove ? "O" : "X",
                      };
                    });
                    setCurrentMove(Number(!currentMove));
                  }}
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
              );
            })}
          </div>
        </div>
        {winningText && (
          <div className="flex justify-center py-3">
            <div className="text-dark">{winningText}</div>
          </div>
        )}
        {
          isGameFinished ? (
            (
              <div className="flex justify-center py-3">
                <button
                  onClick={restartGame}
                  className="bg-white border-2 shadow-lg border-dark text-dark px-3 py-2 rounded-md active:shadow-none"
                >
                  Reset Game
                </button>
              </div>
            )
          ) : null
        }
      </div>
    </div>
  );
}

export default App;

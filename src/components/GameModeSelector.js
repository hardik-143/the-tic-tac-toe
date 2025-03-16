import { useDispatch } from "react-redux";
import { setGameMode } from "../store/gameSlice";
import { useState } from "react";
import ButtonClick from "../sounds/buttons-click.mp3";
import KeyPress from "../sounds/key-press.mp3";

/**
 * Plays the button click sound
 */
const playButtonClick = () => {
  const sound = new Audio(ButtonClick);
  sound.volume = 0.3;
  sound.play();
};

/**
 * Plays the key press sound
 */
const playKeyPress = () => {
  const sound = new Audio(KeyPress);
  sound.volume = 0.2;
  sound.play();
};

/**
 * Component for selecting game mode (vs Computer or 2 Players)
 */
const GameModeSelector = () => {
  const dispatch = useDispatch();
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  const handleInputChange = (e, setter) => {
    playKeyPress();
    setter(e.target.value);
  };

  const handleModeSelect = (isComputerMode) => {
    playButtonClick();
    setGameMode(isComputerMode);
    setShowNameInput(true);
    setShowDifficulty(false);
  };

  const handleStartGame = (difficulty = null) => {
    if (!player1Name || (!gameMode && !player2Name)) return;

    // Auto-select if only one option remains
    if (gameMode && !difficulty) {
      const remainingDifficulties = difficultyButtons.filter(
        (btn) => btn.value !== difficulty
      );
      if (remainingDifficulties.length === 1) {
        difficulty = remainingDifficulties[0].value;
      }
    }

    playButtonClick();
    try {
      dispatch({
        type: "game/setGameMode",
        payload: {
          isComputerMode: gameMode,
          player1Name,
          player2Name,
          ...(difficulty && { difficulty }),
        },
      });
    } catch (error) {
      console.error("Error dispatching action:", error);
    }
  };

  const handleNextInComputerMode = () => {
    if (!player1Name) return;
    playButtonClick();
    setShowDifficulty(true);
    setShowNameInput(false);
  };

  const handleBack = () => {
    playButtonClick();
    if (showDifficulty) {
      setShowDifficulty(false);
      setShowNameInput(true);
    } else if (showNameInput) {
      setShowNameInput(false);
      setPlayer1Name("");
      setPlayer2Name("");
      setGameMode(null);
    }
  };

  const renderNameInputs = () => (
    <div className="flex flex-col items-center gap-4 p-6">
      <h3 className="text-xl mb-4 text-center font-['Press_Start_2P'] text-white">
        Enter Player Names
      </h3>
      <input
        type="text"
        placeholder="Player 1 Name (X)"
        value={player1Name}
        onChange={(e) => handleInputChange(e, setPlayer1Name)}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none font-['Press_Start_2P'] text-sm w-64"
        maxLength={20}
      />
      {!gameMode && (
        <input
          type="text"
          placeholder="Player 2 Name (O)"
          value={player2Name}
          onChange={(e) => handleInputChange(e, setPlayer2Name)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none font-['Press_Start_2P'] text-sm w-64"
          maxLength={20}
        />
      )}
      <div className="flex gap-4 mt-4">
        {gameMode ? (
          <button
            onClick={handleNextInComputerMode}
            disabled={!player1Name}
            className={`px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 font-['Press_Start_2P'] text-sm ${
              !player1Name ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => handleStartGame()}
            disabled={!player1Name || !player2Name}
            className={`px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 font-['Press_Start_2P'] text-sm ${
              !player1Name || !player2Name
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Start Game
          </button>
        )}
        <button
          onClick={handleBack}
          className="px-6 py-2 text-gray-400 hover:text-white transition-colors duration-300 font-['Press_Start_2P'] text-xs mt-2"
        >
          ← Back
        </button>
      </div>
    </div>
  );

  const difficultyButtons = [
    { label: "Easy", value: "easy", color: "green" },
    { label: "Medium", value: "medium", color: "yellow" },
    { label: "Hard", value: "hard", color: "red" },
  ];

  if (showNameInput) {
    return renderNameInputs();
  }

  if (showDifficulty) {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <h3 className="text-xl mb-4 text-center font-['Press_Start_2P'] text-white">
          Select Difficulty
        </h3>
        <div className="flex flex-col gap-4">
          {difficultyButtons.map(({ label, value, color }) => (
            <button
              key={value}
              onClick={() => handleStartGame(value)}
              className={`px-6 py-3 bg-gradient-to-r from-${color}-600 to-${color}-800 text-white rounded-lg shadow-lg hover:from-${color}-700 hover:to-${color}-900 transition-all duration-300 font-['Press_Start_2P'] text-sm w-48`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors duration-300 font-['Press_Start_2P'] text-xs mt-2"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h3 className="text-xl mb-4 text-center font-['Press_Start_2P'] text-white">
        Select Game Mode
      </h3>
      <div className="flex gap-4">
        <button
          onClick={() => handleModeSelect(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 font-['Press_Start_2P'] text-sm"
        >
          vs Computer
        </button>
        <button
          onClick={() => handleModeSelect(false)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-800 text-white rounded-lg shadow-lg hover:from-cyan-700 hover:to-cyan-900 transition-all duration-300 font-['Press_Start_2P'] text-sm"
        >
          2 Players
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;

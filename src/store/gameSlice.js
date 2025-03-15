import { createSlice } from "@reduxjs/toolkit";
import GameDraw from "../sounds/game-draw.mp3";
import GameFinished from "../sounds/game-finished.mp3";
import GameLose from "../sounds/game-lose.mp3";
import { POSSIBLE_RESULTS } from "../components/constants";

/**
 * Initial state for the game slice
 * @typedef {Object} GameState
 * @property {string} winningText - Text to display when game is finished
 * @property {boolean} disabledGame - Whether the game board is disabled
 * @property {Object.<number, string>} moves - Object containing moves, where key is cell index and value is 'X' or 'O'
 * @property {boolean} isGameFinished - Whether the game has finished
 * @property {boolean} isDraw - Whether the game ended in a draw
 * @property {number} currentMove - Current player's turn (0 = X, 1 = O)
 * @property {boolean} isComputerMode - Whether playing against computer
 * @property {boolean} gameStarted - Whether game mode has been selected
 * @property {string} difficulty - Difficulty level for computer opponent ('easy', 'medium', 'hard')
 * @property {string} player1Name - Name of player 1 (X)
 * @property {string} player2Name - Name of player 2 (O) or 'Computer'
 */
const initialState = {
  winningText: "",
  disabledGame: false,
  moves: {},
  isGameFinished: false,
  isDraw: false,
  currentMove: 0, // 0 = X, 1 = O
  isComputerMode: false,
  gameStarted: false,
  difficulty: "easy",
  player1Name: "",
  player2Name: "",
};

/**
 * Plays the appropriate sound effect when game is finished
 * @param {boolean} isDraw - Whether the game ended in a draw
 * @param {boolean} isComputerWin - Whether computer won in computer mode
 * @returns {void}
 */
const playFinishedSound = (isDraw, isComputerWin) => {
  let soundFile = GameFinished;
  if (isDraw) {
    soundFile = GameDraw;
  } else if (isComputerWin) {
    soundFile = GameLose;
  }
  const sound = new Audio(soundFile);
  sound.loop = false;
  sound.play();
};

/**
 * Gets available moves for computer
 * @param {Object.<number, string>} moves - Current game moves
 * @returns {number[]} Array of available cell indices
 */
const getAvailableMoves = (moves) => {
  const available = [];
  for (let i = 0; i < 9; i++) {
    if (!moves[i]) available.push(i);
  }
  return available;
};

/**
 * Checks if a move would result in a win
 * @param {Object.<number, string>} moves - Current game moves
 * @param {number} index - Move to check
 * @param {string} player - Player symbol ('X' or 'O')
 * @returns {boolean} Whether the move would win
 */
const isWinningMove = (moves, index, player) => {
  const tempMoves = { ...moves, [index]: player };
  return POSSIBLE_RESULTS.some(
    ([a, b, c]) =>
      tempMoves[a] === player &&
      tempMoves[b] === player &&
      tempMoves[c] === player
  );
};

/**
 * Makes a strategic computer move based on difficulty
 * @param {Object.<number, string>} moves - Current game moves
 * @param {string} difficulty - Game difficulty level
 * @returns {number} Selected cell index for computer move
 */
const makeComputerMove = (moves, difficulty) => {
  const available = getAvailableMoves(moves);

  // Easy: Random moves
  if (difficulty === "easy") {
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }

  // Check for winning move
  for (const index of available) {
    if (isWinningMove(moves, index, "O")) {
      return index;
    }
  }

  // Hard: Block opponent's winning move
  if (difficulty === "hard") {
    for (const index of available) {
      if (isWinningMove(moves, index, "X")) {
        return index;
      }
    }
  }

  // Medium/Hard: Try to take center if available
  if (difficulty !== "easy" && !moves[4] && available.includes(4)) {
    return 4;
  }

  // Medium/Hard: Try to take corners
  const corners = [0, 2, 6, 8].filter((corner) => available.includes(corner));
  if (difficulty !== "easy" && corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // Take any available move
  return available[Math.floor(Math.random() * available.length)];
};

/**
 * Redux slice for managing the Tic Tac Toe game state
 * @type {import('@reduxjs/toolkit').Slice}
 */
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameMode: (state, action) => {
      const { isComputerMode, difficulty, player1Name, player2Name } =
        action.payload;
      state.isComputerMode = isComputerMode;
      state.player1Name = player1Name;
      state.player2Name = isComputerMode ? "Computer" : player2Name;
      if (difficulty) {
        state.difficulty = difficulty;
      }
      state.gameStarted = true;
      state.moves = {};
      state.isGameFinished = false;
      state.isDraw = false;
      state.winningText = "";
      state.disabledGame = false;
      state.currentMove = 0;
    },

    makeMove: (state, action) => {
      const { index } = action.payload;
      if (state.moves[index] || !state.gameStarted) return;

      // Player move
      state.moves[index] = state.currentMove ? "O" : "X";
      state.currentMove = Number(!state.currentMove);

      // Check for winner or draw after player move
      if (checkWinOrDraw(state)) return;

      // If only one box remains, fill it automatically
      const availableMoves = getAvailableMoves(state.moves);
      if (availableMoves.length === 1) {
        const lastIndex = availableMoves[0];
        state.moves[lastIndex] = state.currentMove ? "O" : "X";
        state.currentMove = Number(!state.currentMove);
        checkWinOrDraw(state);
        return;
      }

      // Computer move if in computer mode and it's computer's turn
      if (
        state.isComputerMode &&
        !state.isGameFinished &&
        state.currentMove === 1
      ) {
        const computerMoveIndex = makeComputerMove(
          state.moves,
          state.difficulty
        );
        state.moves[computerMoveIndex] = "O";
        state.currentMove = 0;
        checkWinOrDraw(state);
      }
    },

    restartGame: (state, action) => {
      const keepMode = action.payload?.keepMode ?? false;
      const isComputerMode = state.isComputerMode;
      const gameStarted = state.gameStarted;
      const difficulty = state.difficulty;
      const player1Name = state.player1Name;
      const player2Name = state.player2Name;

      Object.assign(state, initialState);

      if (keepMode) {
        state.isComputerMode = isComputerMode;
        state.gameStarted = gameStarted;
        state.difficulty = difficulty;
        state.player1Name = player1Name;
        state.player2Name = player2Name;
      }
    },
  },
});

/**
 * Checks for win or draw condition and updates state accordingly
 * @param {GameState} state - Current game state
 * @returns {boolean} Whether game has ended
 */
const checkWinOrDraw = (state) => {
  if (Object.keys(state.moves).length >= 5) {
    const winner = POSSIBLE_RESULTS.find((result) => {
      const [a, b, c] = result;
      return (
        state.moves[a] &&
        state.moves[a] === state.moves[b] &&
        state.moves[a] === state.moves[c]
      );
    });

    if (winner) {
      const isComputerWin =
        state.isComputerMode && state.moves[winner[0]] === "O";
      playFinishedSound(false, isComputerWin);
      state.isGameFinished = true;
      const winnerName =
        state.moves[winner[0]] === "X" ? state.player1Name : state.player2Name;
      state.winningText = `${winnerName} wins! 🎉`;
      state.disabledGame = true;
      return true;
    } else if (Object.keys(state.moves).length === 9) {
      playFinishedSound(true, false);
      state.isGameFinished = true;
      state.isDraw = true;
      state.winningText = "It's a draw! 🤝";
      state.disabledGame = true;
      return true;
    }
  }
  return false;
};

export const { makeMove, restartGame, setGameMode } = gameSlice.actions;
export default gameSlice.reducer;

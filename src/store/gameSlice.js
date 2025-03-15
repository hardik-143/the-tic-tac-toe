import { createSlice } from "@reduxjs/toolkit";
import GameDraw from "../sounds/game-draw.mp3";
import GameFinished from "../sounds/game-finished.mp3";
import { POSSIBLE_RESULTS } from "../components/constants";

const initialState = {
  winningText: "",
  disabledGame: false,
  moves: {},
  isGameFinished: false,
  isDraw: false,
  currentMove: 0, // 0 = X, 1 = O
};

const playFinishedSound = (isDraw) => {
  const sound = new Audio(isDraw ? GameDraw : GameFinished);
  sound.loop = false;
  sound.play();
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    makeMove: (state, action) => {
      const { index } = action.payload;
      if (state.moves[index]) return;

      state.moves[index] = state.currentMove ? "O" : "X";
      state.currentMove = Number(!state.currentMove);

      // Check for winner or draw
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
          playFinishedSound(false);
          state.isGameFinished = true;
          state.winningText = `${state.moves[winner[0]]} wins! 🎉`;
          state.disabledGame = true;
        } else if (Object.keys(state.moves).length === 9) {
          playFinishedSound(true);
          state.isGameFinished = true;
          state.isDraw = true;
          state.winningText = "It's a draw! 🤝";
          state.disabledGame = true;
        }
      }
    },
    restartGame: (state) => {
      state.moves = {};
      state.isGameFinished = false;
      state.winningText = "";
      state.disabledGame = false;
      state.isDraw = false;
      state.currentMove = 0;
    },
  },
});

export const { makeMove, restartGame } = gameSlice.actions;
export default gameSlice.reducer;

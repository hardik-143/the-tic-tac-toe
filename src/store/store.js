import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import { gameMiddleware } from "./middleware";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameMiddleware),
});

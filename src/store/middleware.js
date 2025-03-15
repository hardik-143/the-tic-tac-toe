/**
 * Custom middleware to handle async game actions
 */
export const gameMiddleware = (store) => (next) => (action) => {
  if (action.type === "game/setGameMode") {
    // Handle the game mode setting synchronously
    return next(action);
  }

  if (action.type === "game/makeMove") {
    // Handle moves asynchronously to allow for computer's move
    return new Promise((resolve) => {
      const result = next(action);
      resolve(result);
    });
  }

  return next(action);
};

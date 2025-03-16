/**
 * All possible winning combinations in Tic Tac Toe
 * Each array represents the indices of cells that form a winning line
 */
export const POSSIBLE_RESULTS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

/**
 * All possible moves in the game
 * Each object contains:
 * - position: The index of the cell (0-8)
 * - description: Human-readable description of the position
 */
export const ALL_POSSIBLE_MOVES = [
  { position: 0, description: "Top-left corner" },
  { position: 1, description: "Top-center" },
  { position: 2, description: "Top-right corner" },
  { position: 3, description: "Middle-left" },
  { position: 4, description: "Center" },
  { position: 5, description: "Middle-right" },
  { position: 6, description: "Bottom-left corner" },
  { position: 7, description: "Bottom-center" },
  { position: 8, description: "Bottom-right corner" },
];

/**
 * Strategic positions in the game
 * Each object contains:
 * - position: The index of the cell
 * - importance: Description of why this position is important
 */
export const STRATEGIC_POSITIONS = [
  {
    position: 4,
    importance:
      "Center - Most important position, part of 4 winning combinations",
  },
  { position: 0, importance: "Corner - Part of 3 winning combinations" },
  { position: 2, importance: "Corner - Part of 3 winning combinations" },
  { position: 6, importance: "Corner - Part of 3 winning combinations" },
  { position: 8, importance: "Corner - Part of 3 winning combinations" },
  { position: 1, importance: "Edge - Part of 2 winning combinations" },
  { position: 3, importance: "Edge - Part of 2 winning combinations" },
  { position: 5, importance: "Edge - Part of 2 winning combinations" },
  { position: 7, importance: "Edge - Part of 2 winning combinations" },
];

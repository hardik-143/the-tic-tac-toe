# Modern Tic Tac Toe Game

A feature-rich, modern implementation of the classic Tic Tac Toe game built with React and Redux Toolkit. The game offers both single-player (vs Computer) and two-player modes with a beautiful, responsive UI.

## 🎮 Features

### Game Modes

- **VS Computer**: Play against an AI opponent with three difficulty levels
  - Easy: Random moves
  - Medium: Strategic moves with basic blocking
  - Hard: Advanced strategy with winning move detection and blocking
- **2 Players**: Play against a friend locally

### Player Customization

- Custom player names for both modes
- Player X always starts first
- Computer plays as O in VS Computer mode

### Game Intelligence

- Smart computer opponent with different strategies based on difficulty:
  - Winning move detection
  - Opponent move blocking (in Hard mode)
  - Strategic center and corner control
- Automatic last move completion when only one box remains

### User Interface

- Modern, responsive design with Tailwind CSS
- Beautiful gradient buttons and hover effects
- Press Start 2P font for retro gaming feel
- Clear game status display
- Disabled controls when game ends

### Sound Effects

- Victory sound when a player wins
- Special lose sound when computer wins
- Draw game sound for ties
- Different sound effects for different game outcomes

### Game Flow

1. Select game mode (VS Computer or 2 Players)
2. Enter player name(s)
3. Select difficulty (in VS Computer mode)
4. Play the game
5. Option to restart with same settings or return to mode selection

## 🎯 Gameplay Features

### VS Computer Mode

- Three difficulty levels to choose from
- Computer makes strategic decisions based on:
  - Winning opportunities
  - Blocking opponent's winning moves (Hard mode)
  - Control of center and corners
  - Random moves in Easy mode

### Two Player Mode

- Local multiplayer gameplay
- Custom names for both players
- Clear turn indicators

### Game Logic

- Win detection for horizontal, vertical, and diagonal lines
- Draw detection when board is full
- Automatic move completion for last remaining box
- Game board disabled after win/draw

## 🔧 Technical Features

- Built with React and Redux Toolkit
- State management with Redux
- Custom middleware for handling game actions
- Responsive design with Tailwind CSS
- Sound effect integration
- Modular component architecture

## 🎨 UI/UX Features

- Intuitive game flow
- Clear visual feedback
- Responsive design
- Accessibility considerations
- Interactive elements with hover states
- Disabled states for invalid actions

## 🔄 Game Controls

- Click/tap to make moves
- Back button to navigate between screens
- Restart button to begin new game
- Mode selection for different gameplay options

## 🎵 Sound System

- Victory sound for winning
- Distinct sound for losing to computer
- Draw game sound
- All sounds are non-intrusive and enhance gameplay

## 🎯 Future Enhancements

- Online multiplayer mode
- Game statistics and history
- Customizable board sizes
- Additional sound effects
- Animation effects
- Achievement system

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to play

## 💻 Technologies Used

- React
- Redux Toolkit
- Tailwind CSS
- HTML5 Audio
- JavaScript ES6+

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](link-to-issues).

import { Link } from "react-router-dom";

const HowToPlay = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 p-6">
        <div className="flex justify-between items-center w-full max-w-lg mb-4">
          <Link
            to="/"
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300 font-['Press_Start_2P'] text-xs"
          >
            ← Back to Game
          </Link>
          <h2 className="text-2xl font-['Press_Start_2P'] text-white">
            How to Play
          </h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg max-w-lg">
          <h3 className="text-xl font-['Press_Start_2P'] text-white mb-4">
            Basic Rules
          </h3>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>• Players take turns placing X's and O's on the board</li>
            <li>• First player to get 3 in a row wins!</li>
            <li>• Can be horizontal, vertical, or diagonal</li>
            <li>• If no one wins and board is full, it's a draw</li>
          </ul>

          <h3 className="text-xl font-['Press_Start_2P'] text-white mb-4">
            Strategy Tips
          </h3>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>• Take the center if available</li>
            <li>• Take corners to create multiple winning opportunities</li>
            <li>• Block your opponent's winning moves</li>
            <li>• Create "fork" opportunities (two ways to win)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;

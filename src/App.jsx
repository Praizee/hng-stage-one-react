import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Trophy } from "lucide-react";
import "./App.css";

const generateRandomColor = () => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#800000",
    "#008080",
    "#000080",
    "#FF4500",
    "#32CD32",
    "#4169E1",
    "#FFD700",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateOptions = (correctColor) => {
  const options = [correctColor];
  while (options.length < 6) {
    const color = generateRandomColor();
    if (!options.includes(color)) {
      options.push(color);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    setOptions(generateOptions(targetColor));
  }, [targetColor]);

  const handleGuess = (color) => {
    setIsAnimating(true);
    if (color === targetColor) {
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        return newScore;
      });
      setGameStatus("Correct!");
      setTimeout(() => {
        const newColor = generateRandomColor();
        setTargetColor(newColor);
        setGameStatus("");
        setIsAnimating(false);
      }, 1000);
    } else {
      setGameStatus("Wrong! Try again!");
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const startNewGame = () => {
    setScore(0);
    const newColor = generateRandomColor();
    setTargetColor(newColor);
    setGameStatus("");
    setIsAnimating(false);
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <div className="game-header">
          <h1>Color Guessing Game</h1>
          <p data-testid="gameInstructions" className="game-instructions">
            Match the target color by selecting the correct option below
          </p>
        </div>

        <div className="game-stats">
          <div className="score-container">
            <div data-testid="score" className="score">
              <Trophy className="icon" />
              <span>Score: {score}</span>
            </div>
            <div className="high-score">
              <Trophy className="icon" />
              <span>Best: {highScore}</span>
            </div>
          </div>
          <button
            data-testid="newGameButton"
            onClick={startNewGame}
            className="new-game-button"
          >
            New Game
          </button>
        </div>

        <div className="target-color-container">
          <div
            data-testid="colorBox"
            className="target-color"
            style={{ backgroundColor: targetColor }}
          />
          <div
            data-testid="gameStatus"
            className={`game-status ${isAnimating ? "show" : ""}`}
          >
            {gameStatus && (
              <div className="status-message">
                {gameStatus === "Correct!" ? (
                  <CheckCircle2 className="icon success" />
                ) : (
                  <AlertCircle className="icon error" />
                )}
                <span
                  className={gameStatus === "Correct!" ? "success" : "error"}
                >
                  {gameStatus}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="color-options">
          {options.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;


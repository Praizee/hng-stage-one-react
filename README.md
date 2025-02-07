# Color Guessing Game

A fun and interactive color guessing game built with React where players test their color matching skills.

## Features

- Random color generation with 6 options per round
- Auto-progression on correct guesses
- Score tracking with high score
- Responsive design
- Smooth animations

## Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd color-game

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

## Project Structure

```
src/
├── assets/
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Game Components

The game includes data attributes for testing:
- `data-testid="colorBox"` - Target color display
- `data-testid="colorOption"` - Color choice buttons
- `data-testid="gameInstructions"` - Game instructions
- `data-testid="gameStatus"` - Game status
- `data-testid="score"` - Score display
- `data-testid="newGameButton"` - New game button

## Development

Built with:
- React
- Vite
- Lucide React (for icons)

// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Elements
const boardElement = document.getElementById('board');
const resultElement = document.getElementById('result');
const currentPlayerElement = document.getElementById('currentPlayer');
const statusElement = document.getElementById('status');

// Event listeners
boardElement.addEventListener('click', handleCellClick);

// Initialize the game board
initializeBoard();

// Function to handle cell clicks
function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkForWin()) {
            endGame(`${currentPlayer} wins!`);
        } else if (board.every(cell => cell !== '')) {
            endGame('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateGameStatus();
        }
    }
}

// Function to check for a win
function checkForWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

// Function to end the game
function endGame(message) {
    gameActive = false;
    statusElement.textContent = message;
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    // Clear the board UI
    boardElement.innerHTML = '';

    // Re-initialize the board
    initializeBoard();
    updateGameStatus();
}

// Function to initialize the game board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        boardElement.appendChild(cell);
    }

    updateGameStatus();
}

// Function to update game status display
function updateGameStatus() {
    currentPlayerElement.textContent = currentPlayer;
    statusElement.textContent = gameActive ? 'In Progress' : 'Game Over';
}

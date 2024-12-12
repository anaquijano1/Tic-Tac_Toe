const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // 'X' starts the game
let board = ['', '', '', '', '', '', '', '', '']; // Empty board array
let isGameOver = false; // Flag to track if the game is over
message.textContent = "Click to start!";

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== '' || isGameOver) {
    message.textContent = "Invalid move, try again!";
    message.style.color = 'black';
    return;
  } else {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (currentPlayer === 'X') {
      e.target.style.color = '#DA2C38'; // Set X color to red
    } else {
        e.target.style.color = '#0570C7'; // Set O color to blue
    }
  }

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
    if (currentPlayer === 'X') {
      message.style.color = '#DA2C38'; // Set X color to red
    } else {
      message.style.color = '#0570C7'; // Set O color to blue
    }
  } else if (board.every(cell => cell !== '')) {
    message.textContent = 'It\'s a tie!';
    isGameOver = true;
    message.style.color = 'black';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  currentPlayer = 'X';

  cells.forEach(cell => {
    cell.textContent = '';
  });

  message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);


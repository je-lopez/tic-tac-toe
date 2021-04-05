const boxes = document.querySelectorAll('.box');

let player = 'X';
let winner = '';
let isGameOver = false;
let playerMoves = { 'X': [], 'O': [] };

const winningCombinations = [
  [1,2,3], [4,5,6], [7,8,9], // rows
  [1,4,7], [2,5,8], [3,6,9], // colums
  [1,5,9], [3,5,7]           // cross
];

const reset = () => {
  document.getElementById('game-status').textContent = '';

  boxes.forEach(box => {
    box.innerHTML = '';

    box.classList.remove('blue');
    box.classList.remove('red');

    box.addEventListener('click', handleBoxClick, { once: true });
  });

  player = 'X';
  winner = '';
  isGameOver = false;
  playerMoves = { 'X': [], 'O': [] };
};

const checkGameStatus = (player) => {
  winningCombinations.forEach(combination => {
    if (combination.every(box => playerMoves[player].includes(box))) {
      isGameOver = true;
      winner = player;
    }
  });

  if (!isGameOver && playerMoves['X'].length + playerMoves['O'].length === 9) {
    isGameOver = true;
    winner = 'Tie';
  }

  if (isGameOver) {
    document.getElementById('game-status').textContent = `Game Over! ${winner === 'Tie' ? `It's a tie!` : `The winner is ${player}`}`;
    boxes.forEach(box => box.removeEventListener('click', handleBoxClick));
  }
};

const handleBoxClick = (e) => {
  e.preventDefault();

  playerMoves[player].push(Number(e.target.getAttribute('data-id')));

  e.target.innerHTML = player;
  e.target.classList.add(player === 'X' ? 'blue' : 'red');
  checkGameStatus(player);
  player = player === 'X' ? 'O' : 'X';
};

boxes.forEach(box => box.addEventListener('click', handleBoxClick, { once: true }));

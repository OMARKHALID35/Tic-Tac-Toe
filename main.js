const board = document.querySelector(".board");
let cells = Array.from({ length: 9 });
let currentPlayer = "X";

const handleClick = (e) => {
  const cellIndex = e.target.dataset.index;
  //check if cell is empty or not
  if (cells[cellIndex]) return;
  updateCell(cellIndex, currentPlayer);
  const winner = checkWinner();
  if (winner || !cells.includes(undefined)) {
    alert(winner ? `Player ${winner} Wins!` : `It's A Draw`);
    resetGame();
  }
};

const updateCell = (index, value) => {
  cells[index] = value;
  const cell = board.querySelector(`[data-index="${index}"]`);
  cell.textContent = value;
  cell.classList.add(value === "X" ? "player-x" : "player-o");
  //switch process
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const checkWinner = () => {
  const winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winnerCombos) {
    const [a, b, c] = combo;

    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
};

cells.forEach((cell, index) => {
  cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
});

const resetGame = () => {
  cells = Array.from({ length: 9 });
  currentPlayer === "X" ? "O" : "X";
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-o", "player-x");
  });
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "r") {
    resetGame();
  }
});

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const winnerDisplay = document.getElementById("winner");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
  switch (true) {
    case boardState[0] &&
      boardState[0] === boardState[1] &&
      boardState[0] === boardState[2]:
    case boardState[3] &&
      boardState[3] === boardState[4] &&
      boardState[3] === boardState[5]:
    case boardState[6] &&
      boardState[6] === boardState[7] &&
      boardState[6] === boardState[8]:
    case boardState[0] &&
      boardState[0] === boardState[3] &&
      boardState[0] === boardState[6]:
    case boardState[1] &&
      boardState[1] === boardState[4] &&
      boardState[1] === boardState[7]:
    case boardState[2] &&
      boardState[2] === boardState[5] &&
      boardState[2] === boardState[8]:
    case boardState[0] &&
      boardState[0] === boardState[4] &&
      boardState[0] === boardState[8]:
    case boardState[2] &&
      boardState[2] === boardState[4] &&
      boardState[2] === boardState[6]:
      return currentPlayer;
    default:
      return boardState.includes("") ? null : "Draw";
  }
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (boardState[index] || checkWinner()) {
    return;
  }
  boardState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.style.color = currentPlayer === "X" ? "#000" : "#000";
  const winner = checkWinner();
  if (winner) {
    winnerDisplay.textContent =
      winner === "Draw" ? "It's a draw!" : `Winner is ${winner}!`;
    cells.forEach((cell) => cell.removeEventListener("click", handleClick));
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.color = "#000";
    cell.addEventListener("click", handleClick);
  });
  currentPlayer = "X";
  winnerDisplay.textContent = "";
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
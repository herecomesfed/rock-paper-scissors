const options = [
  {
    move: "paper",
    icon: "src",
  },
  {
    move: "scissor",
    icon: "src",
  },
  {
    move: "rock",
    icon: "src",
  },
];

// DOM Selectors
const frontScreen = document.querySelector(".front-screen");
const gameScreen = document.querySelector(".play-screen");
const modal = document.querySelector(".result");
const btnContainer = document.querySelector(".game-mode__buttons");
const restart = document.querySelector(".restart");
const cards = document.querySelector(".cards");
const roundWinner = document.querySelector(".round-winner");
const winnerPlayer = document.querySelector(".winner");

const player1ActualScore = document.querySelector(
  ".score__player--1 .actual-score"
);
const player2ActualScore = document.querySelector(
  ".score__player--2 .actual-score"
);

// Game Variables
const MAX_SCORE = 3;
let isGameStarted = false;
let player1Selection = "";
let player2Selection = "";
let player1Score = 0;
let player2Score = 0;
let gameWinner = "";
let gameMode = "";

// Functions

// Start Game
function gameStarted() {
  isGameStarted = true;
  frontScreen.dataset.active = !isGameStarted;
  gameScreen.dataset.active = isGameStarted;
  console.log("You are currently playing");
  if (gameMode === "cpu-vs-cpu") {
    setInterval(cpuvscpu, 2000);
  }
}

// Restart Game
function restartGame() {
  isGameStarted = false;
  gameMode = "";
  frontScreen.dataset.active = true;
  gameScreen.dataset.active = false;
  modal.dataset.active = false;
  clearInterval(cpuvscpu);
}

btnContainer.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.closest('[data-game="human-vs-cpu"]')) {
    gameMode = "human-vs-cpu";
    gameScreen.dataset.game = gameMode;
  }
  if (e.target.closest('[data-game="cpu-vs-cpu"]')) {
    gameMode = "cpu-vs-cpu";
    gameScreen.dataset.game = gameMode;
  }
  if (e.target.closest(".game-mode__button")) {
    gameStarted();
  }
});

restart.addEventListener("click", function () {
  restartGame();
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".restart")) {
    player1Score = 0;
    player2Score = 0;
    player1ActualScore.textContent = 0;
    player2ActualScore.textContent = 0;
    gameScreen.dataset.game = "";
    restartGame();
  }
});

function cpuvscpu() {
  if (!isGameStarted) return;
  player1Selection = options[Math.round(Math.random() * 2)].move;
  player2Selection = options[Math.round(Math.random() * 2)].move;
  checkWinner();
}

// Human vs CPU
cards.addEventListener("click", function (e) {
  if (!isGameStarted) return;
  console.log(e.target.getAttribute("data-move"));
  player1Selection = options.find(
    ({ move }) => move === e.target.getAttribute("data-move")
  ).move;
  player2Selection = options[Math.round(Math.random() * 2)].move;
  console.log("Player 1", player1Selection);
  console.log("Player 2", player2Selection);
  checkWinner();
});

const checkWinner = function () {
  if (player1Selection === player2Selection) {
    console.log("Draw");
    return;
  }
  if (
    (player1Selection === "paper" && player2Selection === "rock") ||
    (player1Selection === "scissor" && player2Selection === "paper") ||
    (player1Selection === "rock" && player2Selection === "scissor")
  ) {
    console.log("Player 1 wins");
    player1Score++;
    roundWinner.textContent = "Player 1 won the round";
    player1ActualScore.textContent = player1Score;
  } else {
    console.log("Player 2 Wins");
    player2Score++;
    roundWinner.textContent = "Player 2 won the round";
    player2ActualScore.textContent = player2Score;
  }
  console.log("Player 1 Score:", player1Score);
  console.log("Player 2 Score:", player2Score);
  player1Score === MAX_SCORE && (gameWinner = "Player 1");
  player2Score === MAX_SCORE && (gameWinner = "Player 2");
  if (player1Score === MAX_SCORE || player2Score === MAX_SCORE) {
    console.log(gameWinner);
    isGameStarted = false;
    winnerPlayer.textContent = gameWinner;
    showModal();
  }
};

const showModal = function () {
  modal.dataset.active = true;
};

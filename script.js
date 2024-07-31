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
const gameScreen = document.querySelector(".play-screen");
const btnContainer = document.querySelector(".game-mode__buttons");
const restart = document.querySelector(".restart");
const cards = document.querySelector(".cards");
const roundWinner = document.querySelector(".round-winner");
const winnerPlayer = document.querySelector(".winner");
const cardResultsContainer = document.querySelector(".cards--result");
const modal = document.querySelector(".modal");

const player1ActualScore = document.querySelector(".score-1 .score__number");
const player2ActualScore = document.querySelector(".score-2 .score__number");

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

function startGame() {
  isGameStarted = true;
}
startGame();

cards.addEventListener("click", chooseCard);

function chooseCard(e) {
  if (!isGameStarted) return;
  // My Choice
  const selectedCard = e.target.closest(".card");
  // Return if the target isn't selected card
  if (!selectedCard) return;
  // Clone choiced card
  showResult(selectedCard);

  console.log(e.target.closest(".card"));
  selectedCard.classList.add("active");
  // Find Player Selection in the Object
  player1Selection = options.find(
    ({ move }) => move === selectedCard.getAttribute("data-move")
  ).move;
  player2Selection = options[Math.round(Math.random() * 2)].move;
  const domelement = document.querySelector(
    `[data-move="${player2Selection}"]`
  );
  // Clone choiced CPU Card
  showResult(domelement);
  console.log("Dome element", domelement);
  console.log("Player 1", player1Selection);
  console.log("Player 2", player2Selection);

  // Check who wins
  checkWinner();

  // Reset style of selected card
  setTimeout(() => {
    selectedCard.classList.remove("active");
  }, 1000);
  isGameStarted = false;
  openModal();
}

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
    player1ActualScore.textContent = player1Score;
  } else {
    console.log("Player 2 Wins");
    player2Score++;
    player2ActualScore.textContent = player2Score;
  }
  console.log("Player 1 Score:", player1Score);
  console.log("Player 2 Score:", player2Score);
  // player1Score === MAX_SCORE && (gameWinner = "Player 1");
  // player2Score === MAX_SCORE && (gameWinner = "Player 2");
};

function showResult(selected) {
  const clonedElement = selected.cloneNode(true);
  cardResultsContainer.appendChild(clonedElement);
}

function openModal() {
  modal.dataset.active = "true";
  document.querySelector(".play-again").addEventListener("click", playAgain);
  document.querySelector(".reset").addEventListener("click", function () {
    reset();
    playAgain();
  });
}

function playAgain() {
  console.log("Ciaooooo");
  isGameStarted = true;
  modal.dataset.active = "false";
  cardResultsContainer.innerHTML = "";
}

function reset() {
  player1Score = 0;
  player2Score = 0;
  player1ActualScore.textContent = player1Score;
  player2ActualScore.textContent = player2Score;
}

// // Restart Game
// function restartGame() {
//   isGameStarted = false;
//   gameMode = "";
//   frontScreen.dataset.active = true;
//   gameScreen.dataset.active = false;
//   modal.dataset.active = false;
//   clearInterval(cpuvscpu);
// }

// btnContainer.addEventListener("click", function (e) {
//   console.log(e.target);
//   if (e.target.closest('[data-game="human-vs-cpu"]')) {
//     gameMode = "human-vs-cpu";
//     gameScreen.dataset.game = gameMode;
//   }
//   if (e.target.closest('[data-game="cpu-vs-cpu"]')) {
//     gameMode = "cpu-vs-cpu";
//     gameScreen.dataset.game = gameMode;
//   }
//   if (e.target.closest(".game-mode__button")) {
//     gameStarted();
//   }
// });

// restart.addEventListener("click", function () {
//   restartGame();
// });

// document.addEventListener("click", function (e) {
//   if (e.target.closest(".restart")) {
//     player1Score = 0;
//     player2Score = 0;
//     player1ActualScore.textContent = 0;
//     player2ActualScore.textContent = 0;
//     gameScreen.dataset.game = "";
//     restartGame();
//   }
// });

// function cpuvscpu() {
//   if (!isGameStarted) return;
//   player1Selection = options[Math.round(Math.random() * 2)].move;
//   player2Selection = options[Math.round(Math.random() * 2)].move;
//   checkWinner();
// }

// // Human vs CPU
// cards.addEventListener("click", function (e) {
//   if (!isGameStarted) return;
//   console.log(e.target.getAttribute("data-move"));
//   player1Selection = options.find(
//     ({ move }) => move === e.target.getAttribute("data-move")
//   ).move;
//   player2Selection = options[Math.round(Math.random() * 2)].move;
//   console.log("Player 1", player1Selection);
//   console.log("Player 2", player2Selection);
//   checkWinner();
// });

// const checkWinner = function () {
//   if (player1Selection === player2Selection) {
//     console.log("Draw");
//     return;
//   }
//   if (
//     (player1Selection === "paper" && player2Selection === "rock") ||
//     (player1Selection === "scissor" && player2Selection === "paper") ||
//     (player1Selection === "rock" && player2Selection === "scissor")
//   ) {
//     console.log("Player 1 wins");
//     player1Score++;
//     roundWinner.textContent = "Player 1 won the round";
//     player1ActualScore.textContent = player1Score;
//   } else {
//     console.log("Player 2 Wins");
//     player2Score++;
//     roundWinner.textContent = "Player 2 won the round";
//     player2ActualScore.textContent = player2Score;
//   }
//   console.log("Player 1 Score:", player1Score);
//   console.log("Player 2 Score:", player2Score);
//   player1Score === MAX_SCORE && (gameWinner = "Player 1");
//   player2Score === MAX_SCORE && (gameWinner = "Player 2");
//   if (player1Score === MAX_SCORE || player2Score === MAX_SCORE) {
//     console.log(gameWinner);
//     isGameStarted = false;
//     winnerPlayer.textContent = gameWinner;
//     showModal();
//   }
// };

// const showModal = function () {
//   modal.dataset.active = true;
// };

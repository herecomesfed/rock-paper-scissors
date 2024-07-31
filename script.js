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
const cardResultsContainer = document.querySelector(".result-container");
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
let matchWinner = "";
let gameMode = "cpuvscpu";

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
  // showResult(selectedCard);

  console.log(e.target.closest(".card"));
  selectedCard.classList.add("active");
  // Find Player Selection in the Object
  player1Selection = options.find(
    ({ move }) => move === selectedCard.getAttribute("data-move")
  ).move;
  player2Selection = options[Math.round(Math.random() * 2)].move;

  console.log("Player 1", player1Selection);
  console.log("Player 2", player2Selection);

  cards.dataset.active = "false";

  // Reset style of selected card
  setTimeout(() => {
    selectedCard.classList.remove("active");
  }, 1000);

  // Check who wins
  checkWinner();

  // Mostra la schermata del risultato
  showResult(player1Selection, player2Selection);

  isGameStarted = false;

  cardResultsContainer.dataset.active = "true";
  // openModal();
}

btnContainer.addEventListener("click", function (e) {
  if (e.target.closest('[data-game="cpu-vs-cpu"]')) {
    autoChooseMove();
  }
});

function autoChooseMove() {
  if (!isGameStarted) return;
  if (gameMode === "cpuvscpu") {
    player2Selection = options[Math.round(Math.random() * 2)].move;

    console.log("Player 1", player1Selection);
    console.log("Player 2", player2Selection);

    cards.dataset.active = "false";

    // Check who wins
    checkWinner();

    // Mostra la schermata del risultato
    showResult(player1Selection, player2Selection);
    isGameStarted = false;

    cardResultsContainer.dataset.active = "true";
  }
}

const checkWinner = function () {
  if (player1Selection === player2Selection) {
    console.log("Draw");
    matchWinner = "Draw";
    console.log("matchWinner", matchWinner);
    return;
  }
  if (
    (player1Selection === "paper" && player2Selection === "rock") ||
    (player1Selection === "scissor" && player2Selection === "paper") ||
    (player1Selection === "rock" && player2Selection === "scissor")
  ) {
    player1Score++;
    player1ActualScore.textContent = player1Score;
    matchWinner = "Player 1 wins";
    console.log("matchWinner", matchWinner);
  } else {
    player2Score++;
    player2ActualScore.textContent = player2Score;
    matchWinner = "Player 2 wins";
    console.log("matchWinner", matchWinner);
  }
  console.log("Player 1 Score:", player1Score);
  console.log("Player 2 Score:", player2Score);
};

function showResult(player1Selection, player2Selection) {
  // prettier-ignore
  const resultMarkup = `<div class="cards cards--result">
    <div class="card" data-move="${player1Selection}" aria-label="${player1Selection}">
      <img src="assets/${player1Selection}.png" alt="${player1Selection}" />
      <h4>${firstLetterUppercase(player1Selection)}</h4>
    </div>
    <div class="result">
    <h4 class="match-winner">${matchWinner}</h4>
      <div class="btns-container">
        <button class="btn play-again">Gioca Ancora!</button>
        <button class="btn btn--outline reset">Reset Score</button>
      </div>
    </div>
    <div class="card" data-move="${player2Selection}" aria-label="${player2Selection}">
      <img src="assets/${player2Selection}.png" alt="${player2Selection}" />
      <h4>${firstLetterUppercase(player2Selection)}</h4>
    </div>
  </div>`
  cardResultsContainer.insertAdjacentHTML("beforeend", resultMarkup);

  // New game and reset Buttons
  document.querySelector(".play-again").addEventListener("click", playAgain);
  document.querySelector(".reset").addEventListener("click", function () {
    reset();
    playAgain();
  });
}

function playAgain() {
  matchWinner = "";
  cards.dataset.active = "true";
  isGameStarted = true;
  cardResultsContainer.dataset.active = "false";
  cardResultsContainer.innerHTML = "";
}

function reset() {
  matchWinner = "";
  player1Score = 0;
  player2Score = 0;
  player1ActualScore.textContent = player1Score;
  player2ActualScore.textContent = player2Score;
}

function firstLetterUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

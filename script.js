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
const restart = document.querySelector(".restart");
// const playerField = document.querySelector(".player-field");
const cards = document.querySelector(".cards");
const roundWinner = document.querySelector(".round-winner");
const winnerPlayer = document.querySelector(".winner");
const cardResultsContainer = document.querySelector(".result-container");
const gameModeButtonContainer = document.querySelector(".game-mode__buttons");
const startCPUGame = document.querySelector(".start-cpu-game");

const player1ActualScore = document.querySelector(".score-1 .score__number");
const player2ActualScore = document.querySelector(".score-2 .score__number");

// Game Variables
// const MAX_SCORE = 3;
let isGameStarted = false;
let player1Selection = "";
let player2Selection = "";
let player1Score = 0;
let player2Score = 0;
let matchWinner = "";

let gameMode = "human-vs-cpu";

// Functions

gameModeButtonContainer.addEventListener("click", handleGameMode);
function handleGameMode(e) {
  if (!isGameStarted) return;
  const btnTarget = e.target.closest(".game-mode__button");
  if (!btnTarget) return;
  gameMode = btnTarget.dataset.gamemode;
  document.body.dataset.gamemode = gameMode;
  if (gameMode === "cpu-vs-cpu") {
    cards.dataset.active = false;
    startCPUGame.dataset.active = true;
  }
  if (gameMode === "human-vs-cpu") {
    cards.dataset.active = true;
    startCPUGame.dataset.active = false;
  }
  startGame();
}

function startGame() {
  isGameStarted = true;
  const isHumanVsCPU = gameMode === "human-vs-cpu";
  const isCPUVsCPU = gameMode === "cpu-vs-cpu";
  cards.addEventListener("click", chooseCard);
  startCPUGame.addEventListener("click", chooseCard);

  function chooseCard(e) {
    if (!isGameStarted) return;
    // My Choice if is Human VS CPU
    if (isHumanVsCPU) {
      const selectedCard = e.target.closest(".card");

      // Return if the target isn't selected card
      if (!selectedCard) return;

      selectedCard.classList.add("active");
      player1Selection = selectedCard.getAttribute("data-move");

      // Reset style of selected card
      setTimeout(() => {
        selectedCard.classList.remove("active");
      }, 1000);
    }

    // My Choice if is CPU vs CPU
    if (isCPUVsCPU) {
      const playCPUButton = e.target.closest(".start-cpu-game__btn");
      if (playCPUButton) {
        player1Selection = options[Math.round(Math.random() * 2)].move;
      }
    }

    player2Selection = options[Math.round(Math.random() * 2)].move;

    isHumanVsCPU && (cards.dataset.active = false);
    isCPUVsCPU && (startCPUGame.dataset.active = false);

    // Check who wins
    checkWinner();

    // Mostra la schermata del risultato
    showResult(player1Selection, player2Selection);

    isGameStarted = false;

    cardResultsContainer.dataset.active = "true";
  }

  const checkWinner = function () {
    if (player1Selection === player2Selection) {
      matchWinner = "Draw";
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
    } else {
      player2Score++;
      player2ActualScore.textContent = player2Score;
      matchWinner = "Player 2 wins";
    }
  };

  function showResult(player1Selection, player2Selection) {
    // prettier-ignore
    const resultMarkup = 
    `<div class="cards cards--result">
      <div class="card" data-move="${player1Selection}" aria-label="${player1Selection}">
        <img src="assets/${player1Selection}.png" alt="${player1Selection}" />
        <h4>${firstLetterUppercase(player1Selection)}</h4>
      </div>
      <div class="result">
      <h4 class="match-winner">${matchWinner}</h4>
        <div class="btns-container btns-container--result">
          <button class="btn play-again">Gioca Ancora!</button>
          <button class="btn btn--outline reset">Reset Game</button>
        </div>
      </div>
      <div class="card" data-move="${player2Selection}" aria-label="${player2Selection}">
        <img src="assets/${player2Selection}.png" alt="${player2Selection}" />
        <h4>${firstLetterUppercase(player2Selection)}</h4>
      </div>
    </div>`
    cardResultsContainer.insertAdjacentHTML("beforeend", resultMarkup);

    // New game and reset Buttons
    const btnsContainerResult = document.querySelector(
      ".btns-container--result"
    );
    btnsContainerResult.addEventListener("click", function (e) {
      if (e.target.closest(".play-again")) {
        playAgain();
      }
      if (e.target.closest(".reset")) {
        reset();
        playAgain();
      }
    });
  }

  function playAgain() {
    matchWinner = "";
    if (gameMode !== "cpu-vs-cpu") {
      cards.dataset.active = "true";
    } else {
      startCPUGame.dataset.active = "true";
    }
    isGameStarted = true;
    cardResultsContainer.dataset.active = "false";
    cardResultsContainer.innerHTML = "";
    startGame();
  }

  function reset() {
    matchWinner = "";
    player1Score = 0;
    player2Score = 0;
    player1ActualScore.textContent = player1Score;
    player2ActualScore.textContent = player2Score;
    gameMode = "human-vs-cpu";
    document.body.dataset.gamemode = gameMode;
  }

  function firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
startGame();

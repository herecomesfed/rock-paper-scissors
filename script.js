const options = [
  {
    move: "rock",
    moveName: "Rock",
    icon: "./assets/rock.png",
  },
  {
    move: "paper",
    moveName: "Paper",
    icon: "./assets/paper.png",
  },
  {
    move: "scissor",
    moveName: "Scissor",
    icon: "./assets/scissor.png",
  },
];

// DOM Selectors
const restart = document.querySelector(".restart");
const cards = document.querySelector(".cards");
const cardResultsContainer = document.querySelector(".result-container");
const gameModeContainer = document.querySelector(".game-mode");
const gameModeButtonContainer = document.querySelector(".game-mode__buttons");
const startCPUGame = document.querySelector(".start-cpu-game");
const player1ActualScore = document.querySelector(".score--1 .score__number");
const player2ActualScore = document.querySelector(".score--2 .score__number");

// Game Variables
let isGameStarted = false;
let player1Selection = "";
let player2Selection = "";
let player1Score = 0;
let player2Score = 0;
let matchWinner = "";
let gameMode = "human-vs-cpu"; // Hu vs CPU by default

// Functions

// Create list of cards based on the option object:
function createCards() {
  options.forEach((o) => {
    // prettier-ignore
    const cardsHTML = `
                <li class="card" data-move="${o.move}" aria-label="${o.move}">
                  <div class="card__inner">
                    <img src="${o.icon}" alt="${o.moveName}" />
                    <h4>${o.moveName}</h4>
                  </div>
                </li>
  `;
    cards.insertAdjacentHTML("beforeend", cardsHTML);
  });
}
createCards();

// Select Mode between "Human vs CPU" and "CPU vs CPU"
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

// Start Game on Load
// This function contains all the game logic
function startGame() {
  isGameStarted = true;
  const isHumanVsCPU = gameMode === "human-vs-cpu";
  const isCPUVsCPU = gameMode === "cpu-vs-cpu";
  cards.addEventListener("click", chooseCard);
  startCPUGame.addEventListener("click", chooseCard);

  function chooseCard(e) {
    // Guard Clause: Block the card choice if the game isn't started
    if (!isGameStarted) return;
    // My Choice if is Human VS CPU
    if (isHumanVsCPU) {
      const selectedCard = e.target.closest(".card");

      // Return if the target isn't selected card
      if (!selectedCard) return;

      player1Selection = selectedCard.getAttribute("data-move");
    }

    // My Choice if is CPU vs CPU
    if (isCPUVsCPU) {
      const playCPUButton = e.target.closest(".start-cpu-game__btn");
      if (playCPUButton) {
        player1Selection = options[Math.round(Math.random() * 2)].move;
      }
    }

    player2Selection = options[Math.round(Math.random() * 2)].move;

    // Hide Game Mode Buttons when showing game result
    gameModeContainer.dataset.active = false;

    // Hide Card selection or Start button when showing solution
    isHumanVsCPU && (cards.dataset.active = false);
    isCPUVsCPU && (startCPUGame.dataset.active = false);

    // Check who wins
    checkWinner();

    cardResultsContainer.dataset.active = "true";

    // Show result container with selected cards
    showResult(player1Selection, player2Selection);

    isGameStarted = false;
  }

  // Check the winner based on P1 and P2 choices
  const checkWinner = function () {
    // Game Winner Logic
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
    // Generate result based on Player's choices
    // prettier-ignore
    const resultMarkup = 
    `<div class="cards cards--result">
      <div class="card" data-move="${player1Selection}" aria-label="${player1Selection}">
        <div class="card__inner">
          <img src="assets/${player1Selection}.png" alt="${player1Selection}" />
          <h4>${firstLetterUppercase(player1Selection)}</h4>
        </div>
      </div>
      <div class="result">
      <h4 class="match-winner">${matchWinner}</h4>
        <div class="btn-container btn-container--result">
          <button class="btn play-again">Play Again!</button>
          <button class="btn btn--outline reset">Reset Score</button>
        </div>
      </div>
      <div class="card" data-move="${player2Selection}" aria-label="${player2Selection}">
        <div class="card__inner">
          <img src="assets/${player2Selection}.png" alt="${player2Selection}" />
          <h4>${firstLetterUppercase(player2Selection)}</h4>
        <div class="card__inner">
      </div>
    </div>`
    cardResultsContainer.insertAdjacentHTML("beforeend", resultMarkup);

    // New game and reset Buttons
    const btnContainerResult = document.querySelector(".btn-container--result");
    btnContainerResult.addEventListener("click", function (e) {
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
    gameModeContainer.dataset.active = true;
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
  }

  function firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

startGame();

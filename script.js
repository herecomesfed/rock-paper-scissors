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

let isGameStarted = false;
const frontScreen = document.querySelector(".front-screen");
const gameScreen = document.querySelector(".play-screen");
const btnContainer = document.querySelector(".game-mode__buttons");
const restart = document.querySelector(".restart");
const cards = document.querySelector(".cards");
let player1Selection = "";
let player2Selection = "";
let player1Score = 0;
let player2Score = 0;

function gameStarted() {
  isGameStarted = !isGameStarted;
  frontScreen.dataset.active = !isGameStarted;
  gameScreen.dataset.active = isGameStarted;
  console.log("You are currently playing");
}
function restartGame() {
  isGameStarted = false;
  frontScreen.dataset.active = true;
  gameScreen.dataset.active = false;
}

btnContainer.addEventListener("click", function (e) {
  //   const singleButton = document.querySelector(".game-mode__button");
  console.log(e.target);
  if (e.target.closest(".game-mode__button")) {
    gameStarted();
  }
});

restart.addEventListener("click", function () {
  restartGame();
});

cards.addEventListener("click", function (e) {
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
  player1Score++;
  console.log(player1Score);
};

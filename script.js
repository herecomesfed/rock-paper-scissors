let isGameStarted = false;
const frontScreen = document.querySelector(".front-screen");
const gameScreen = document.querySelector(".play-screen");
const btnContainer = document.querySelector(".game-mode__buttons");
const restart = document.querySelector(".restart");
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

import "/public/assets/styles/main.css";
import { setUpGame } from "./js/setup";
import { resetStats } from "./js/setup";
// import { startGame } from "./js/logic";

window.onload = function () {
  setUpGame();
};

let gameOver = true;
let score;
let lives;
let moleInterval;
let timer;
let countdown;
let toRemove;
let isCapLifted = false;
let currentMoleTile;

document.querySelector(".main__button").addEventListener("click", () => {
  if (gameOver) {
    startGame();
  } else {
    clearInterval(countdown);
    clearInterval(moleInterval);
    gameOver = true;
    setUpGame();
  }
});
document.querySelector(".board").addEventListener("click", (event) => {
  const clickedImg = event.target.closest(".mole");

  if (clickedImg) {
    handleClick(clickedImg);
    clickedImg.style.pointerEvents = "none";
  }
});

function startGame() {
  if (!gameOver) {
    return;
  }
  document.querySelector(".main__button").innerText = 'Сбросить';
  resetStats();
  gameOver = false;
  score = 0;
  lives = 3;
  timer = 60;
  moleInterval = setInterval(placeMole, 500);
  setCountdown();
}

function placeMole() {
  if (isCapLifted) {
    toggleCurrentCap();
    isCapLifted = false;
  } else {
    if (gameOver) return;
    if (currentMoleTile) {
      toRemove = currentMoleTile.querySelector(".mole");
      toRemove.remove();
    }
    createMole();
    toggleCurrentCap();
    isCapLifted = true;
  }
}

function createMole() {
  let moleType = getRandomMole();
  let mole = document.createElement("img");
  mole.classList.add("mole");
  mole.draggable = false;
  mole.src = `./public/assets/images/mole_${moleType}.svg`;
  if (moleType === "1") {
    mole.classList.add("viewer");
  }

  let id = getRandomTile();
  currentMoleTile = document.getElementById(id);
  currentMoleTile.appendChild(mole);
}

function getRandomTile() {
  let id = Math.floor(Math.random() * 9);
  return id.toString();
}

function getRandomMole() {
  let id = Math.floor(Math.random() * 2);
  return id.toString();
}

function handleClick(img) {
  if (img.classList.contains("viewer")) {
    lives -= 1;
    if (lives === 0) endGame();
    updateLives(lives);
  } else {
    score += 10;
    if (score === 100) {
      endGame();
    }
    document.querySelector(".stats__score").innerHTML = `${score}/100`;
  }
}

function updateLives() {
  const life = "#";
  document.querySelector(".lives__current").innerHTML = `${life.repeat(lives)}`;
  document.querySelector(".lives__lost").innerHTML = `${life.repeat(
    3 - lives
  )}`;
}

function endGame() {
  clearInterval(moleInterval);
  clearInterval(countdown);
  gameOver = true;
  currentMoleTile.querySelector(".tile__cap").addEventListener(
    "transitionend",
    () => {
      toRemove = currentMoleTile.querySelector(".mole");
      toRemove.remove();
      currentMoleTile = "";
      gameOver = true;
      generateAlert();
    },
    { once: true }
  );
}

function toggleCurrentCap() {
  currentMoleTile.querySelector(".tile__cap").classList.toggle("lifted");
}

function setCountdown() {
  countdown = setInterval(() => {
    timer--;
    document.querySelector(".stats__time").textContent = `${timer}`;

    if (timer <= 0) {
      clearInterval(countdown);
      clearInterval(moleInterval);
      endGame();
    }
  }, 1000);
}

function generateAlert() {
  if (lives === 0) {
    alert(`Тебя отчислили!\nТвой счет: ${score}.\nПопробуй еще раз.`);
  }
  if (timer <= 0) {
    alert(
      `Ты не успел вернуть все баллы!\nТвой счет: ${score}.\nПопробуй еще раз.`
    );
  }
  if (score === 100) {
    alert(
      `Ура, ты вернул свои баллы!\nТвой итоговый счет: ${score + timer}.\n`
    );
  }
}

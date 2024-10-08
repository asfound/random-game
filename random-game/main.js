import "./public/assets/styles/main.css";
import { setUpGame } from "./js/setup";
import { saveScore } from "./js/score.js";
import "./js/input.js";
// import { getScores } from "./js/leaderboard.js";
import { updateScores } from "./js/leaderboard.js";

import "./js/tabs.js";

// updateScores(newScore);

window.onload = function () {
  setUpGame();
  document.querySelector(".main__button").addEventListener("click", () => {
    if (gameOver) {
      startGame();
    } else {
      resetGame();
    }
  });
};

let gameOver = true;
let score;
let lives;
let moleInterval;
let timer;
let countdown;
let toRemove;
let isCapLifted = false;
let currentMoleTile = null;

function startGame() {
  if (!gameOver) {
    return;
  }
  document.querySelector(".main__button").innerText = "Сбросить";
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
      removeLastMole();
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

  mole.addEventListener("click", handleClick, { once: true });

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

function handleClick(event) {
  if (event.target.classList.contains("viewer")) {
    lives -= 1;
    if (lives === 0) {
      score = 0;
      endGame();
    }
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

export function resetGame() {
  if (isCapLifted) {
    toggleCurrentCap();
    isCapLifted = false;
  }
  clearInterval(moleInterval);
  clearInterval(countdown);
  gameOver = true;
  if (currentMoleTile && currentMoleTile.querySelector) {
    const tileCap = currentMoleTile.querySelector(".tile__cap");
    if (tileCap) {
      tileCap.addEventListener(
        "transitionend",
        () => {
          removeLastMole();
          currentMoleTile = null;
          resetStats();
        },
        { once: true }
      );
    }
  }
  document.querySelector(".main__button").innerHTML = "Начать";
}

function endGame() {
  if (isCapLifted) {
    toggleCurrentCap();
    isCapLifted = false;
  }
  clearInterval(moleInterval);
  clearInterval(countdown);
  gameOver = true;
  saveScore(score, timer);
  currentMoleTile.querySelector(".tile__cap").addEventListener(
    "transitionend",
    () => {
      removeLastMole();
      currentMoleTile = null;
      generateAlert();
      resetStats();
    },
    { once: true }
  );
  document.querySelector(".main__button").innerHTML = "Начать";
}

function toggleCurrentCap() {
  if (currentMoleTile) {
    const tileCap = currentMoleTile.querySelector(".tile__cap");
    if (tileCap) {
      currentMoleTile.querySelector(".tile__cap").classList.toggle("lifted");
    }
  } else {
    return;
  }
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

function resetStats() {
  document.querySelector(".stats__time").innerHTML = "60";
  document.querySelector(".stats__score").innerHTML = "0/100";
  document.querySelector(".lives__lost").innerHTML = "";
  document.querySelector(".lives__current").innerHTML = "###";
}

function removeLastMole() {
  if (currentMoleTile) {
    toRemove = currentMoleTile.querySelector(".mole");
    toRemove.remove();
  }
}


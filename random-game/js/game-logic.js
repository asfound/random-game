import { saveScore } from "./score";
import { updateScores } from "./leaderboard";

let isFlashOn = false;
export let gameOver = true;
let score;
let lives;
let moleInterval;
let timer;
let countdown;
let toRemove;
let isCapLifted = false;
let currentMoleTile = null;

export function startGame() {
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
  mole.src = `./assets/images/mole_${moleType}.svg`;
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
  event.target.classList.add("hit");
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
  clearIntervals();
  gameOver = true;

  if (currentMoleTile && currentMoleTile.querySelector(".tile__cap")) {
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
  clearIntervals();
  gameOver = true;

  const finalScore = calculateScore(score, timer, isFlashOn);
  saveScore(finalScore);

  const newEntry = generateScoreEntry(finalScore);
  updateScores(newEntry);

  currentMoleTile.querySelector(".tile__cap").addEventListener(
    "transitionend",
    () => {
      removeLastMole();
      currentMoleTile = null;
      generateScoreAlert(finalScore);
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

    if (timer == 0) {
      endGame();
    }
  }, 1000);
}

export function clearIntervals() {
  clearInterval(countdown);
  clearInterval(moleInterval);
}

function generateScoreAlert(currentScore) {
  const dialog = document.querySelector(".dialog");
  const dialogMessage = document.querySelector(".dialog__message");

  if (lives === 0) {
    dialogMessage.textContent = `Тебя отчислили!\nТвой счет: ${currentScore}.\nПопробуй еще раз.`;
  }
  if (timer <= 0) {
    dialogMessage.textContent = `Ты не успел вернуть все баллы!\nТвой счет: ${currentScore}.\nПопробуй еще раз.`;
  }
  if (score === 100) {
    dialogMessage.textContent = `Ура, ты вернул свои баллы!\nТвой итоговый счет: ${currentScore}.\n`;
  }

  dialog.showModal();
}

document.querySelector(".dialog__button").addEventListener("click", () => {
  const dialog = document.querySelector(".dialog");
  const dialogMessage = document.querySelector(".dialog__message");

  dialog.close();
  dialogMessage.textContent = "";
});

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
  } else {
    return;
  }
}

function calculateScore(score, timer, isDouble) {
  if (timer > 0 && score > 0) {
    score += timer;
  }
  if (isDouble) {
    score *= 2;
  }
  return score;
}

function generateScoreEntry(score) {
  const currentPlayer = localStorage.getItem("playerName");

  const newEntry = {
    name: currentPlayer,
    score: score,
  };

  return newEntry;
}

const flashlight = document.querySelector(".flashlight");
const flashContainer = document.querySelector(".flashlight__container");
const flashButton = document.querySelector(".settings__button");

flashButton.addEventListener("click", toggleFlash);

function toggleFlash() {
  resetGame();
  flashContainer.classList.toggle("hidden");
  isFlashOn = !isFlashOn;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.code === "Escape") {
    if (isFlashOn) {
      flashContainer.classList.add("hidden");
      resetGame();
      isFlashOn = !isFlashOn;
    }
  }
});

document.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  flashlight.style.left = `${x}px`;
  flashlight.style.top = `${y}px`;
});

export function isTablet() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 1024) {
    flashButton.disabled = true;
  }
}

import "/public/assets/styles/main.css";
import { setUpGame } from "./js/setup";
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

document.querySelector(".main__button").addEventListener("click", startGame);
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
  gameOver = false;
  score = 0;
  lives = 3;
  timer = 10;
  moleInterval = setInterval(placeMole, 1500);
  setCountdown();
}

let currentMoleTile;

function placeMole() {
  if (currentMoleTile) {
    toggleCurrentCap();

    currentMoleTile.querySelector(".tile__cap").addEventListener(
      "transitionend",
      () => {
        currentMoleTile.querySelector(".mole").remove();
        createMole();
      },
      { once: true }
    );
  } else {
    createMole();
  }
}

function createMole() {
  let moleType = getRandomMole();
  let mole = document.createElement("img");
  mole.classList.add("mole");
  mole.src = `./public/assets/images/mole_${moleType}.svg`;
  if (moleType === "1") {
    mole.classList.add("viewer");
  }

  let id = getRandomTile();
  currentMoleTile = document.getElementById(id);
  currentMoleTile.appendChild(mole);
  toggleCurrentCap();
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
      clearInterval(countdown);
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
  toggleCurrentCap();
  currentMoleTile.querySelector(".tile__cap").addEventListener(
    "transitionend",
    () => {
      currentMoleTile.querySelector(".mole").remove();
      currentMoleTile = "";
      gameOver = true;
      alert(`Game Over!\nYour final score: ${score}`);
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
      endGame();
    }
  }, 1000);
}

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

document.querySelector(".main__button").addEventListener("click", startGame);
document.querySelector(".board").addEventListener("click", (event) => {
  const clickedImg = event.target.closest(".mole");
  if (clickedImg) {
    handleClick(clickedImg);
  }
});

function startGame() {
  gameOver = false;
  score = 0;
  lives = 3;
  moleInterval = setInterval(placeMole, 1500);
}

let currentMoleTile;
let toRemove;

function placeMole() {
  if (currentMoleTile) {
    currentMoleTile.querySelector(".tile__cap").classList.toggle("lifted");
    toRemove = currentMoleTile.querySelector(".mole");
    setTimeout(() => {
      toRemove.remove();
      createMole();
    }, 500);
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
  currentMoleTile.querySelector(".tile__cap").classList.toggle("lifted");
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
  gameOver = true;
  clearInterval(moleInterval);
}

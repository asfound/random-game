import "/public/assets/styles/main.css";
import { setUpGame } from "./js/setup";
// import { startGame } from "./js/logic";

window.onload = function () {
  setUpGame();
};

let gameOver = true;
let score;
let lives;

document.querySelector(".main__button").addEventListener("click", startGame);
document.querySelector(".board").addEventListener("click", (event) => {
//   const isMole = event.target.closest("img");
//   const isViewer = event.target.closest("img");
  console.log(event.target);
});

function startGame() {
  gameOver = false;
  score = 0;
  lives = 2;
  setInterval(placeMole, 1500);
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

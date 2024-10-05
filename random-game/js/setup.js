export function setUpGame() {
  resetStats();
  generateBoard();
}

function generateBoard() {
  for (let i = 0; i < 9; i++) {
    document.querySelector(".board").appendChild(generateTile(i));
  }
}

function generateTile(i) {
  let tile = document.createElement("div");
  tile.classList.add("board__tile");
  tile.id = i.toString();

  let tileCap = document.createElement("img");
  tileCap.classList.add("tile__cap");
  tileCap.src = `./public/assets/images/${i}.png`;
  tile.appendChild(tileCap);
  return tile;
}

export function resetStats() {
  document.querySelector(".stats__time").innerHTML = "60";
  document.querySelector(".stats__score").innerHTML = "0/100";
  document.querySelector(".lives__lost").innerHTML = "";
  document.querySelector(".lives__current").innerHTML = "###";
}


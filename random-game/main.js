import "/public/assets/styles/main.css";

// document.querySelector(".board__tile").addEventListener("click", () => {
//   document.querySelector(".tile__cap").classList.toggle("lifted");
// });

window.onload = function () {
  setUpGame();
};

function setUpGame() {
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

  return tile
}

export function setUpGame() {
  const tab = document.querySelector('.game')
  tab.innerHTML = '';
  tab.append(generateStats(), generateBoard(), generateButton());
}

function generateStats() {
  const stats = document.createElement('div');
  stats.classList.add('stats');

  const time = document.createElement('div');
  time.classList.add('stats__time');
  time.textContent = '60';

  const score = document.createElement('div');
  score.classList.add('stats__score');
  score.textContent = '0/100';

  const lives = document.createElement('div');
  lives.classList.add('stats__lives');

  const livesLost = document.createElement('span');
  livesLost.classList.add('lives__lost');

  const livesCurrent = document.createElement('span');
  livesCurrent.classList.add('lives__current');
  livesCurrent.textContent = '###';

  lives.append(livesLost, livesCurrent);
  stats.append(time, score, lives);
  return stats
}


function generateBoard() {
  const board = document.createElement('div');
  board.classList.add('board');
  for (let i = 0; i < 9; i++) {
    board.appendChild(generateTile(i));
  }
  return board
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

function generateButton() {
  const button = document.createElement('button');
  button.classList.add('main__button', 'button');
  button.textContent = 'Начать';
  return button
}
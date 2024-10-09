import "./public/assets/styles/main.css";
import { setUpGame } from "./js/game-setup.js";
import "./js/input.js";

import { updateScores } from "./js/leaderboard.js";

import "./js/tabs.js";

// updateScores(newScore);

window.onload = function () {
  setUpGame();
};

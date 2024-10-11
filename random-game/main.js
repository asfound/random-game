import "./styles/main.css";
import { setUpGame } from "./js/game-setup.js";
import "./js/input.js";
import "./js/tabs.js";
import { isTablet } from "./js/game-logic.js";



window.onload = function () {
  setUpGame();
  isTablet();
};

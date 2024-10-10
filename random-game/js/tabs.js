import { generateRulesTab } from "./rules";
import { generateScoreTab } from "./score";
import { generateLeaderboardTab } from "./leaderboard";
import { setUpGame } from "./game-setup";
import { resetGame } from "./game-logic.js";

const tabButtons = document.querySelectorAll(".menu__item");
const tabs = document.querySelectorAll(".tab");

const tabActions = {
  rules: generateRulesTab,
  score: generateScoreTab,
  leaderboard: generateLeaderboardTab,
  game: setUpGame,
};


tabButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    if (!tabs[i].classList.contains("score")) resetGame();

    tabButtons.forEach((b) => b.classList.remove("menu__active"));
    tabs.forEach((tab) => tab.classList.add("hidden"));

    button.classList.add(".menu__active");
    tabs[i].classList.remove("hidden");
    
    const tabClassList = Array.from(tabs[i].classList);
    tabClassList.forEach((className) => {
      if (tabActions[className]) {
        tabActions[className]();
      }
    });
  });
});

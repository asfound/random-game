import { generateRulesTab } from "./rules";
import { resetGame } from "../main";

const tabButtons =document.querySelectorAll('.menu__item');
const tabs = document.querySelectorAll('.tab');

tabButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
        resetGame();
        tabButtons.forEach(b => b.classList.remove('menu__active'));
        tabs.forEach(tab => tab.classList.add('hidden'));
        tabs.forEach((tab, j) => j !== 0 ? tab.innerHTML = '' : tab);

        button.classList.add('.menu__active');
        tabs[i].classList.remove('hidden');

        if (tabs[i].classList.contains('rules')) {
            generateRulesTab();
        }
        
    });
});
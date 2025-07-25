export const input = document.querySelector(".input");
const check = document.querySelector(".check");


input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
        check.classList.remove("hidden");
    } else {
        check.classList.add("hidden");
    }
});


function saveName() {
    const name = input.value.trim().slice(0, 11);
    if (name !== '') {
        localStorage.setItem('asfound_game_playerName', name);
        check.classList.add("hidden");
        input.blur();
    }
}

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        saveName();
    }
});

check.addEventListener('click', saveName);

document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('asfound_game_playerName');
    if (savedName) {
        input.value = savedName; 
        check.classList.add("hidden");
    }
});

export function checkName() {
    const savedName = localStorage.getItem('asfound_game_playerName');
    return !!savedName;
}
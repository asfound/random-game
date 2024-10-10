export function saveScore(score) {
  let scores = JSON.parse(localStorage.getItem("localScores")) || [];
  if (scores.length < 10 || score > scores[scores.length - 1]) {
    scores.push(score);
    scores.sort((a, b) => b - a);
    if (scores.length > 10) {
      scores.pop();
    }
    localStorage.setItem("localScores", JSON.stringify(scores));
  }
}

export function generateScoreTab() {
  const scoresJson = localStorage.getItem("localScores");
  const storedScores = scoresJson ? JSON.parse(scoresJson) : [];

  const tab = document.querySelector(".score");
  tab.innerHTML = "";

  const scoreList = document.createElement("ol");
  scoreList.classList.add(".score__list");
  tab.appendChild(scoreList);

  storedScores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("score__item");

    listItem.innerHTML = `
      <span class="score__rank">${index + 1}.</span>
      <span class="score__value">${score}</span>
    `;

    scoreList.appendChild(listItem);
  });
}

export function saveScore(score, timer) {
  let scores = JSON.parse(localStorage.getItem("localScores")) || [];
  if (timer > 0 && score > 0) {
    score += timer;
  }

  if (scores.length < 10 || score > scores[scores.length - 1]) {
    scores.push(score);
    scores.sort((a, b) => b - a);
    if (scores.length > 10) {
      scores.pop();
    }
    localStorage.setItem("localScores", JSON.stringify(scores));
  }
}

// console.log(localStorage.getItem('localScores'))

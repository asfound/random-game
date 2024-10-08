const binId = "6702c398acd3cb34a8923d9d";
const apiKey = "$2a$10$lxCiUALMchhbANQOgqQzqOAM0viir8h9pKA7OCtL9XLvmZAa0HBp.";
const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

async function getScores() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Access-Key": apiKey,
        "Content-Type": "application/json",
        "X-Bin-Meta": false,
      },
    });
    const data = await response.json();
    return data.top;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// let newScore = {
//     playerName: "Player1",
//     score: 123,
//   };

export async function updateScores(newScore) {
  try {
    const currentScores = await getScores();
    console.log(currentScores);
    if (
      currentScores.length < 10 ||
      newScore.score > currentScores[currentScores.length - 1].score
    ) {
      currentScores.push(newScore);
      currentScores.sort((a, b) => b.score - a.score);
      if (currentScores.length > 10) {
        currentScores.pop();
      }
    }
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "X-Access-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ top: currentScores }),
    });

    if (response.ok) {
      console.log("Данные успешно обновлены!");
    } else {
      console.error("Ошибка при обновлении данных");
    }
  } catch (error) {
    console.error("Ошибка при сохранении данных:", error);
  }
}

export async function generateLeaderboardTab() {
  const tab = document.querySelector(".leaderboard");
  tab.innerHTML = "";
  const loader = document.querySelector(".loader");
  loader.classList.remove("hidden");

  try {
    const scores = await getScores();

    const leaderboardList = document.createElement("ol");
    leaderboardList.classList.add("leaderboard__list");
    tab.appendChild(leaderboardList);

    if (scores && scores.length > 0) {
      scores.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("leaderboard__item");

        listItem.innerHTML = `
        <span class="leaderboard__rank">${index + 1}.</span>
        <span class="leaderboard__name">${player.name}</span>
        <span class="leaderboard__score">${player.score}</span>
      `;

        leaderboardList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  } finally {
    loader.classList.add("hidden");
  }
}

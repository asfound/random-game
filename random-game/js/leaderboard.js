const binId = "6702c398acd3cb34a8923d9d";
const apiKey = "$2a$10$lxCiUALMchhbANQOgqQzqOAM0viir8h9pKA7OCtL9XLvmZAa0HBp.";
const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

export async function getScores() {
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

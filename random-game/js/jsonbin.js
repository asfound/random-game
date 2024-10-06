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
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}


import { rulesTexts } from "./texts";

export function generateRulesTab() {
  const tab = document.querySelector(".rules");
  tab.innerHTML = '';

  const text1 = document.createElement("p");
  text1.classList.add("rules__text");
  text1.textContent = rulesTexts.text1;

  const text2 = document.createElement("p");
  text2.classList.add("rules__text");
  text2.innerHTML = rulesTexts.text2;

  const text3 = document.createElement("p");
  text3.classList.add("rules__text");
  text3.innerHTML = rulesTexts.text3;

  const text4 = document.createElement("p");
  text4.classList.add("rules__text");
  text4.innerHTML = rulesTexts.text4;

  const container = document.createElement("div");
  container.classList.add("rules__container");

  const figure1 = createFigure(
    "./assets/images/mole_0.svg",
    "reviewer",
    "Reviewer1"
  );

  const figure2 = createFigure(
    "./assets/images/mole_1.svg",
    "viewer",
    "Viewer"
  );

  container.append(figure1, figure2);
  tab.append(text1, text2, text3, text4, container);
}

function createFigure(imgSrc, altText, captionText) {
  const figure = document.createElement("figure");
  figure.classList.add("rules__figure");

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = altText;
  img.classList.add("rules__img");

  const caption = document.createElement("figcaption");
  caption.classList.add("rules__caption");
  caption.textContent = captionText;

  figure.append(img, caption);
  return figure;
}

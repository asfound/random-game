import "/public/assets/styles/main.css";

document.querySelector(".board__tile").addEventListener("click", () => {
  document.querySelector(".tile__cap").classList.toggle("lifted");
});


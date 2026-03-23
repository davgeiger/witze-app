import { getJoke, saveJoke } from "./jokeAPI.js";

document.addEventListener("DOMContentLoaded", toggleMode);

const newButtonEL = document.getElementById("getNewJoke");
const saveButtonEl = document.getElementById("saveNewJoke");
const jokeCurrentEl = document.querySelector(".joke__current-joke");
const toggleDarkModeBtn = document.querySelector(".toggle-dark-mode");

newButtonEL.addEventListener("click", main);
saveButtonEl.addEventListener("click", saveJoke);
toggleDarkModeBtn.addEventListener("click", toggleMode);

async function main() {
  let joke = await getJoke();
  jokeCurrentEl.textContent = joke.text;
  saveButtonEl.style.display = "flex";
}

function toggleMode(event) {
  let lightmode = 0;
  lightmode = JSON.parse(localStorage.getItem("lightmode"));

  if (event.type === "click") {
    document.querySelector(".app").classList.toggle("app-light");
    document.querySelector(".joke").classList.toggle("joke-light");
    document.querySelector(".joke__btnSave").classList.toggle("joke-light");
    document
      .querySelector(".joke__categories")
      .classList.toggle("categories-light");

    const savedJokes = document.querySelectorAll(".saved-joke");
    savedJokes.forEach((joke) => {
      joke.classList.toggle("saved-joke-light");
    });
    document
      .querySelector(".toggle-dark-mode")
      .classList.toggle("dark-background");

    lightmode = !lightmode;
    localStorage.setItem("lightmode", JSON.stringify(Boolean(lightmode)));
    return;
  } else if (lightmode) {
    document.querySelector(".app").classList.add("app-light");
    document.querySelector(".joke").classList.add("joke-light");
    document.querySelector(".joke__btnSave").classList.add("joke-light");

    const savedJokes = document.querySelectorAll(".saved-joke");
    savedJokes.forEach((joke) => {
      joke.classList.add("saved-joke-light");
    });
    document
      .querySelector(".toggle-dark-mode")
      .classList.add("dark-background");
  }
}

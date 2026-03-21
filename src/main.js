import { getJoke, saveJoke } from "./jokeAPI.js";

const newButtonEL = document.getElementById("getNewJoke");
newButtonEL.addEventListener("click", main);

const saveButtonEl = document.getElementById("saveNewJoke");
saveButtonEl.addEventListener("click", saveJoke);

const jokeCurrentEl = document.querySelector(".joke__current-joke");

const toggleDarkModeBtn = document.querySelector(".toggle-dark-mode");
toggleDarkModeBtn.addEventListener("click", toggleMode);

async function main() {
  let joke = await getJoke();
  jokeCurrentEl.textContent = joke.text;
  saveButtonEl.style.display = "flex";
}

function toggleMode() {
  document.querySelector(".app").classList.toggle("app-light");
  document.querySelector(".joke").classList.toggle("joke-light");
  document.querySelector(".joke__btnSave").classList.toggle("joke-light");
  const savedJokes = document.querySelectorAll(".saved-joke");
  savedJokes.forEach((joke) => {
    joke.classList.toggle("saved-joke-light");
  });
  document
    .querySelector(".toggle-dark-mode")
    .classList.toggle("dark-background");
}

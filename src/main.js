import { getJoke, saveJoke } from "./jokeAPI.js";

const newButtonEL = document.getElementById("getNewJoke");
newButtonEL.addEventListener("click", main);

const saveButtonEl = document.getElementById("saveNewJoke");
saveButtonEl.addEventListener("click", saveJoke);

const jokeCurrentEl = document.querySelector(".joke__current-joke");

async function main() {
  let joke = await getJoke();
  jokeCurrentEl.textContent = joke.text;
  saveButtonEl.style.display = "flex";
}

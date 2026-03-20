document.addEventListener("DOMContentLoaded", displayJokes);

const STORAGE_KEY = "jokes";
let jokes = [];

const currentJokeEl = document.querySelector(".joke__current-joke");
const defaultText = "Klicke auf Neuen Witz laden, um einen Witz anzuzeigen.";

const savedJokesEl = document.querySelector(".saved-jokes");

async function getJoke() {
  try {
    const response = await fetch("https://witzapi.de/api/joke");
    const json = await response.json();

    return json[0];
  } catch (error) {
    console.log(error);
  }
}
function getJokes() {
  jokes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return jokes;
}

function saveJoke() {
  let jokeText = currentJokeEl.textContent.trim();
  if (jokeText === defaultText) {
    alert("Bitte einen Witz laden.");
    return;
  }
  let newJoke = {
    id: getNextId(),
    text: jokeText,
  };

  const jokeExists = jokes.some((joke) => {
    return joke.text === newJoke.text;
  });

  if (jokeExists) {
    alert("Dieser Witz ist bereits gespeichert.");
  } else {
    jokes.push(newJoke);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes));
    displayJokes();
  }
}

function clearDisplay() {
  const jokesEls = document.querySelectorAll(".saved-joke");
  jokesEls.forEach((jokeEl) => {
    jokeEl.remove();
  });
}

function displayJokes() {
  clearDisplay();

  let jokes = getJokes();

  if (jokes.length === 0) {
    savedJokesEl.textContent = "Keine Witze gespeichert.";
  }

  jokes.forEach((joke) => {
    const jokeDisplay = document.createElement("div");
    jokeDisplay.classList.add("saved-joke");
    jokeDisplay.id = joke.id;
    const jokeText = document.createElement("p");
    jokeText.classList.add("saved-joke__text");
    jokeText.textContent = joke.text;

    const jokeDelete = document.createElement("button");
    jokeDelete.addEventListener("click", deleteJoke);
    jokeDelete.classList.add("saved-joke__btn");
    const svg = `<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="saved-joke__icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
              />
            </svg>`;
    jokeDelete.innerHTML = svg;
    jokeDisplay.appendChild(jokeText);
    jokeDisplay.appendChild(jokeDelete);

    savedJokesEl.appendChild(jokeDisplay);
  });
}

function deleteJoke(event) {
  event.target.closest(".saved-joke").remove();

  const jokeId = event.target.closest(".saved-joke").id;
  let jokes = getJokes();
  const filteredJokes = jokes.filter((joke) => {
    return joke.id !== Number(jokeId);
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredJokes));
  displayJokes();
}

function getNextId() {
  const jokes = getJokes();

  const sortedJokes = jokes.sort((jokeA, jokeB) => jokeA.id - jokeB.id);

  let nextId = 1;

  for (let joke of sortedJokes) {
    if (nextId < joke.id) break;

    nextId = joke.id + 1;
  }

  return nextId;
}

export { getJoke, saveJoke, displayJokes };

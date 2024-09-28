import { textState } from "../components/textState.js";
import { startTimer, stopTimer, isTimerRunning } from "../components/timer.js";
import {
  updateMetricsOnWordCompletion,
  displayResults,
} from "../components/metrics.js";
import { loadMetricsFromStorage } from "../chart/chart.js";

let textInputElement;
let isInputDisabled = false;

export default function initializeInputListeners() {
  if (textInputElement) {
    textInputElement.removeEventListener("input", handleInput);
    textInputElement.removeEventListener("keydown", handleKeyDown);
  }

  textInputElement = document.getElementById("text-input");
  textInputElement.value = "";
  textInputElement.disabled = false;
  textInputElement.focus();
  isInputDisabled = false;

  textInputElement.addEventListener("input", handleInput);
  textInputElement.addEventListener("keydown", handleKeyDown);
}

function handleInput(event) {
  if (isInputDisabled) return;

  const textInput = event.target;
  const inputValue = textInput.value;

  if (!isTimerRunning() && inputValue.length > 0) {
    startTimer(() => {
      endTest();
    });
  }

  const words = textState.currentText.split(" ");
  const currentWordIndex = textState.currentWordIndex;
  const currentWord = words[currentWordIndex];

  const wordElements = document.querySelectorAll(".word");
  const currentWordElement = wordElements[currentWordIndex];
  const charElements = currentWordElement.querySelectorAll(".char");

  charElements.forEach((charElement) => {
    charElement.classList.remove("correct", "incorrect");
  });

  for (let i = 0; i < currentWord.length; i++) {
    const expectedChar = currentWord[i];
    const typedChar = inputValue[i];

    const charElement = charElements[i];

    if (typedChar == null) {
      charElement.classList.remove("correct", "incorrect");
    } else if (typedChar === expectedChar) {
      charElement.classList.add("correct");
      charElement.classList.remove("incorrect");
    } else {
      charElement.classList.add("incorrect");
      charElement.classList.remove("correct");
    }
  }

  if (inputValue.length > currentWord.length) {
    for (let i = currentWord.length; i < inputValue.length; i++) {
      const extraCharElement = document.createElement("span");
      extraCharElement.classList.add("char", "incorrect");
      extraCharElement.innerText = inputValue[i];
      currentWordElement.appendChild(extraCharElement);
    }
  } else {
    const extraCharElements =
      currentWordElement.querySelectorAll(".char.extra");
    extraCharElements.forEach((element) => element.remove());
  }
}

function handleKeyDown(event) {
  if (isInputDisabled) return;

  const textInput = event.target;

  if (event.key === " ") {
    event.preventDefault();

    const inputValue = textInput.value;

    const words = textState.currentText.split(" ");
    const currentWordIndex = textState.currentWordIndex;
    const currentWord = words[currentWordIndex];

    const wordElements = document.querySelectorAll(".word");
    const currentWordElement = wordElements[currentWordIndex];

    const charElements = currentWordElement.querySelectorAll(".char");
    let isWordCorrect = true;
    charElements.forEach((charElement) => {
      if (!charElement.classList.contains("correct")) {
        isWordCorrect = false;
      }
    });

    if (isWordCorrect && inputValue.length === currentWord.length) {
      currentWordElement.classList.add("correct-word");
    } else {
      currentWordElement.classList.add("incorrect-word");
    }

    updateMetricsOnWordCompletion(isWordCorrect);

    currentWordElement.classList.remove("current-word");
    textState.currentWordIndex++;
    textState.currentCharIndex = 0;

    textInput.value = "";

    if (textState.currentWordIndex < wordElements.length) {
      const nextWordElement = wordElements[textState.currentWordIndex];
      nextWordElement.classList.add("current-word");
    } else {
      endTest();
    }
  } else if (event.key === "Backspace") {
  } else if (event.key.length === 1) {
  } else {
    event.preventDefault();
  }
}

function endTest() {
  if (isInputDisabled) return;

  textInputElement.disabled = true;
  isInputDisabled = true;
  textInputElement.blur();
  document.body.focus();
  stopTimer();
  displayResults();
  loadMetricsFromStorage();
}

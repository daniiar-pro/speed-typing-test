import displayTextToTheUser from "./components/displayTextToTheUser.js";
import initializeInputListeners from "./user/userInput.js";
import { initializeTimer, resetTimer } from "./components/timer.js";
import { resetMetrics } from "./components/metrics.js";
import { textState } from "./components/textState.js";
import { loadMetricsFromStorage, displayMetricsChart } from "./chart/chart.js";
import fetchRandomText from "./components/fetchText.js";
import { set_duration } from "./config.js";

async function init() {
  await fetchAndSetText();
  displayTextToTheUser();
  initializeInputListeners();
  initializeTimer(set_duration);
  loadMetricsFromStorage();
  displayMetricsChart();

  document.getElementById("reset-btn").addEventListener("click", resetTest);
  document.getElementById("restart-btn").addEventListener("click", restartTest);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      resetTest();
    } else if (event.key === "Enter") {
      event.preventDefault();

      restartTest();
    }
  });
}

async function fetchAndSetText() {
  const text = await fetchRandomText();
  const cleanedText = removePunctuation(text);
  textState.originalText = cleanedText;
  textState.currentText = cleanedText;
}

function resetTest() {
  resetTimer();
  resetMetrics();
  shuffleText();
  displayTextToTheUser();
  initializeInputListeners();
  initializeTimer(set_duration);
}

function restartTest() {
  resetTimer();
  resetMetrics();
  displayTextToTheUser();
  initializeInputListeners();
  initializeTimer(set_duration);
}

function shuffleText() {
  const words = textState.originalText.split(" ");
  shuffleArray(words);
  const shuffledText = words.join(" ");
  textState.currentText = shuffledText;
  textState.currentWordIndex = 0;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function removePunctuation(text) {
  return text.replace(/[.,;:!'"“”]/g, "");
}

init();

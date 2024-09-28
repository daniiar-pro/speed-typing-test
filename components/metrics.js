import { saveMetrics } from "../storage/storage.js";
import { set_duration } from "../config.js";

let correctWords = 0;
let totalWords = 0;

export function updateMetricsOnWordCompletion(isCorrect) {
  totalWords++;
  if (isCorrect) {
    correctWords++;
  }
}

export function displayResults() {
  const timeRemaining = parseInt(
    document.getElementById("time-display").textContent
  );
  const timeSpent = set_duration - timeRemaining;

  const timeInMinutes = timeSpent / 60;

  let wpm = 0;
  if (timeInMinutes > 0) {
    wpm = Math.round(correctWords / timeInMinutes);
  }

  const accuracy =
    totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `WPM: ${wpm} | Accuracy: ${accuracy}%`;

  saveMetrics({ wpm, accuracy });
}

export function resetMetrics() {
  correctWords = 0;
  totalWords = 0;
  document.getElementById("results").innerHTML = "";
}

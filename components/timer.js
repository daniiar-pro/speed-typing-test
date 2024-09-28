import { set_duration } from "../config.js";

let timeLeft = set_duration;
let timerInterval = null;
let timerRunning = false;
let timerCallback = null;

export function initializeTimer(duration) {
  timeLeft = duration;
  updateTimeDisplay();
  timerRunning = false;
}

export function startTimer(callback) {
  if (timerRunning) return;
  timerRunning = true;
  timerCallback = callback;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimeDisplay();
    if (timeLeft <= 0) {
      stopTimer();
      if (timerCallback) timerCallback();
    }
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

export function resetTimer() {
  stopTimer();
  timeLeft = set_duration;
  updateTimeDisplay();
}

export function isTimerRunning() {
  return timerRunning;
}

function updateTimeDisplay() {
  document.getElementById("time-display").textContent = timeLeft;
}

// src\javascript\document\manipulation.js

import { generateApp } from "../components/functional.js";
import {
  addChosenColorToColorsArray,
  resetColorsArray,
} from "../helpers/utilities.js";
import { globalVariables } from "../state/management.js";

function displayApp() {
  document.querySelector("#app").innerHTML = `
    ${generateApp()}
  `;
}

function updateSlotUI(button) {
  if (globalVariables.colors_array.length < 4) {
    addChosenColorToColorsArray(button.getAttribute("data-color"));
    document.querySelectorAll(".slot")[
      globalVariables.current_slot_index
    ].style.backgroundColor = button.getAttribute("data-color");

    globalVariables.current_slot_index++;
  }
}

function reportIssueIfInvalidAttempt() {
  document.getElementById("message").textContent =
    "Please select exactly 4 colors.";
}

function reportVictory() {
  document.getElementById("message").textContent =
    "You guessed the secret code! You win!";
  return;
}

function reportLoss() {
  document.getElementById("message").textContent =
    "No more attempts left. You lost!";
}

function reportIncorrectGuess() {
  document.getElementById("message").textContent =
    `Incorrect guess. ${globalVariables.attempts_number_max - globalVariables.attempts_number} attempt(s) remaining. Try again!`;
}

function resetSlotsForNextGuess() {
  resetColorsArray();
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.style.backgroundColor = "var(--primary-color-shade-7)";
  });
  globalVariables.current_slot_index = 0;
}

function disableSubmitButton() {
  const submitButton = document.getElementById("submit-guess");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add("disabled-button");
    submitButton.textContent = "Game Over";
  }
}

export {
  displayApp,
  updateSlotUI,
  reportIssueIfInvalidAttempt,
  reportVictory,
  reportLoss,
  reportIncorrectGuess,
  resetSlotsForNextGuess,
  disableSubmitButton,
};

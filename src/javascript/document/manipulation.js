// src\javascript\document\manipulation.js

import { generateApp } from "../components/functional.js";
import {
  addChosenColorToColorsArray,
  resetColorsArray,
  addColorToTempSecretCode,
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
  document.getElementById("message").innerHTML =
    "Please select exactly 4 colors.";
}

function reportVictory() {
  document.getElementById("message").innerHTML =
    "You guessed the secret code! You win!";
  return;
}

function reportLoss() {
  document.getElementById("message").innerHTML =
    "No more attempts left. You lost!";
}

function reportIncorrectGuess() {
  document.getElementById("message").innerHTML =
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
    submitButton.innerHTML = "Game Over";
  }
}

function updateTempSlotUI(button) {
  if (globalVariables.temp_secret_code.length < 4) {
    addColorToTempSecretCode(button.getAttribute("data-color"));
    document.querySelectorAll("#secret-code-modal .slot")[
      globalVariables.current_temp_slot_index
    ].style.backgroundColor = button.getAttribute("data-color");

    globalVariables.current_temp_slot_index++;
  }
}

function resetTempSlotsUI() {
  // Clear the color from each slot
  document
    .querySelectorAll("#secret-code-modal .slot")
    .forEach(
      (slot) => (slot.style.backgroundColor = "var(--primary-color-shade-7)"),
    );

  globalVariables.current_temp_slot_index = 0;
}

function setSecretCode(codeArray) {
  globalVariables.secret_code = [...codeArray];
}

function reRenderSlots() {
  const slots = document.querySelectorAll(".slot");

  // First clear them
  slots.forEach((slot) => {
    slot.style.backgroundColor = "var(--primary-color-shade-7)";
  });

  // Re-draw colors from the updated array
  for (let i = 0; i < globalVariables.colors_array.length; i++) {
    slots[i].style.backgroundColor = globalVariables.colors_array[i];
  }

  // Update the current slot index so new colors will be placed after the last filled slot
  globalVariables.current_slot_index = globalVariables.colors_array.length;
}

function updateUIBasedOnGameState() {
  const setCodeButton = document.getElementById("open-set-code");
  const submitGuessButton = document.getElementById("submit-guess");

  if (!setCodeButton || !submitGuessButton) return;

  // If secret_code has 4 colors, we assume it's set
  const isCodeSet = globalVariables.secret_code.length === 4;

  if (isCodeSet) {
    // Hide "Set Secret Code"
    setCodeButton.style.display = "none";
    // Show "Submit Guess"
    submitGuessButton.style.display = "inline-block";
    submitGuessButton.disabled = false;
  } else {
    // Show "Set Secret Code"
    setCodeButton.style.display = "inline-block";
    // Hide or disable "Submit Guess" if code not set
    submitGuessButton.style.display = "none";
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
  updateTempSlotUI,
  resetTempSlotsUI,
  setSecretCode,
  reRenderSlots,
  updateUIBasedOnGameState,
};

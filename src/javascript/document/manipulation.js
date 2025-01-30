// src\javascript\document\manipulation.js

import { generateApp } from "../components/functional.js";
import { MastermindState } from "../state/management.js";

function displayApp() {
  document.querySelector("#app").innerHTML = `
    ${generateApp()}
  `;
}

function updateSlotUI(button) {
  if (MastermindState.getColorsArray().length < 4) {
    MastermindState.addChosenColorToColorsArray(
      button.getAttribute("data-color"),
    );
    document.querySelectorAll(".slot")[
      MastermindState.getCurrentSlotIndex()
    ].style.backgroundColor = button.getAttribute("data-color");

    MastermindState.incrementCurrentSlotIndex();
  }
}

function reportIssueIfInvalidAttempt() {
  document.getElementById("message").innerHTML =
    "Please select exactly 4 colors.";
}

function reportVictory() {
  document.getElementById("message").innerHTML =
    "You guessed the secret code! You win!";
}

function reportLoss() {
  document.getElementById("message").innerHTML =
    "No more attempts left. You lost!";
}

function reportIncorrectGuess() {
  document.getElementById("message").innerHTML =
    `Incorrect guess. ${MastermindState.getAttemptsNumberMax() - MastermindState.getAttemptsNumber()} attempt(s) remaining. Try again!`;
}

function resetSlotsForNextGuess() {
  MastermindState.resetColorsArray();
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.style.backgroundColor = "var(--primary-color-shade-7)";
  });
  MastermindState.resetCurrentSlotIndex();
}

function disableSubmitButton() {
  const submitButton = document.getElementById("submit-guess");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";
    submitButton.innerHTML = "Game Over";
  }
}

function updateTempSlotUI(button) {
  if (MastermindState.getTempSecretCode().length < 4) {
    MastermindState.addColorToTempSecretCode(button.getAttribute("data-color"));
    document.querySelectorAll("#secret-code-modal .slot")[
      MastermindState.getCurrentTempSlotIndex()
    ].style.backgroundColor = button.getAttribute("data-color");

    MastermindState.incrementCurrentTempSlotIndex();
  }
}

function resetTempSlotsUI() {
  // Clear the color from each slot
  document
    .querySelectorAll("#secret-code-modal .slot")
    .forEach(
      (slot) => (slot.style.backgroundColor = "var(--primary-color-shade-7)"),
    );

  MastermindState.resetCurrentTempSlotIndex();
}

function reRenderSlots() {
  const slots = document.querySelectorAll(".slot");

  // First clear them
  slots.forEach((slot) => {
    slot.style.backgroundColor = "var(--primary-color-shade-7)";
  });

  // Re-draw colors from the updated array
  for (
    let index = 0;
    index < MastermindState.getColorsArray().length;
    index++
  ) {
    slots[index].style.backgroundColor =
      MastermindState.getColorsArray()[index];
  }

  // Update the current slot index so new colors will be placed after the last filled slot
  MastermindState.updateCurrentSlotIndex();
}

function updateButtonStates() {
  const setCodeButton = document.getElementById("open-set-code");
  const submitButton = document.getElementById("submit-guess");
  const resetButton = document.getElementById("reset-game");

  if (!setCodeButton || !submitButton || !resetButton) return;

  const isCodeSet = MastermindState.getSecretCode().length === 4;
  const hasMadeFirstGuess = MastermindState.getAttemptsNumber() > 0;
  const guessSlotsCount = MastermindState.getColorsArray().length;

  setCodeButton.disabled = hasMadeFirstGuess;

  submitButton.disabled = !(isCodeSet && guessSlotsCount === 4);

  resetButton.disabled = !hasMadeFirstGuess;
}

function reportClues({ wellPlacedColors, misplacedColors, notInCodeColors }) {
  const cluesDiv = document.getElementById("clues");
  cluesDiv.classList.remove("hidden");
  document.getElementById("well-placed").innerHTML =
    "<strong>Well placed</strong>: " + (wellPlacedColors.join(", ") || "None");
  document.getElementById("misplaced").innerHTML =
    "<strong>Misplaced</strong>: " + (misplacedColors.join(", ") || "None");
  document.getElementById("not-in-code").innerHTML =
    "<strong>Not in code</strong>: " + (notInCodeColors.join(", ") || "None");
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
  reRenderSlots,
  updateButtonStates,
  reportClues,
};

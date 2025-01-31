// src\javascript\document\manipulation.js

import { generateApp } from "../components/functional.js";
import { MastermindState } from "../state/management.js";

function displayApp() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    ${generateApp()}
  `;

  return app;
}

function updateSlotUI(button, app) {
  const colorsArray = MastermindState.getColorsArray();

  if (colorsArray.length < 4) {
    MastermindState.addChosenColorToColorsArray(
      button.getAttribute("data-color"),
    );

    const slotsArray = app.querySelectorAll(".slot");

    const currentSlotIndex = MastermindState.getCurrentSlotIndex();

    slotsArray[currentSlotIndex].style.backgroundColor =
      button.getAttribute("data-color");

    MastermindState.incrementCurrentSlotIndex();
  }
}

function reportIssueIfInvalidAttempt(app) {
  const reportArea = app.querySelector("#message");

  reportArea.innerHTML = "Please select exactly 4 colors.";
}

function reportVictory(app) {
  const reportArea = app.querySelector("#message");

  reportArea.innerHTML = "You guessed the secret code! You win!";
}

function reportLoss(app) {
  const reportArea = app.querySelector("#message");

  reportArea.innerHTML = "No more attempts left. You lost!";
}

function reportIncorrectGuess(app) {
  const reportArea = app.querySelector("#message");
  const attemptsNumberMax = MastermindState.getAttemptsNumberMax();
  const attemptsNumber = MastermindState.getAttemptsNumber();

  reportArea.innerHTML = `Incorrect guess. ${attemptsNumberMax - attemptsNumber} attempt(s) remaining. Try again!`;
}

function resetSlotsForNextGuess(app) {
  MastermindState.resetColorsArray();

  const slotsArray = app.querySelectorAll(".slot");

  slotsArray.forEach((slot) => {
    slot.style.backgroundColor = "var(--primary-color-shade-7)";
  });

  MastermindState.resetCurrentSlotIndex();
}

function disableSubmitButton(app) {
  const submitButton = app.querySelector("#submit-guess");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "var(--primary-color-shade-7)";
    submitButton.style.color = "var(--primary-color-shade-3)";
    submitButton.style.opacity = 0.5;
    submitButton.style.cursor = "not-allowed";
    submitButton.innerHTML = "Game Over";
  }
}

function updateTemporarySlotUI(button, app) {
  if (MastermindState.getTemporarySecretCode().length < 4) {
    const color = button.getAttribute("data-color");
    const modalSlotsArray = app.querySelectorAll("#secret-code-modal .slot");
    const currentTemporarySlotIndex =
      MastermindState.getCurrentTemporarySlotIndex();

    MastermindState.addColorToTemporarySecretCode(color);
    modalSlotsArray[currentTemporarySlotIndex].style.backgroundColor = color;
    MastermindState.incrementCurrentTemporarySlotIndex();
  }
}

function resetTemporarySlotsUI(secretCodeModal) {
  const modalSlotsArray = secretCodeModal.querySelectorAll(".slot");
  modalSlotsArray.forEach(
    (slot) => (slot.style.backgroundColor = "var(--primary-color-shade-7)"),
  );

  MastermindState.resetCurrentTemporarySlotIndex();
}

function reRenderSlots(app) {
  const slots = app.querySelectorAll(".slot");

  slots.forEach((slot) => {
    slot.style.backgroundColor = "var(--primary-color-shade-7)";
  });

  const colorsArray = MastermindState.getColorsArray();
  for (let index = 0; index < colorsArray.length; index++) {
    slots[index].style.backgroundColor = colorsArray[index];
  }

  MastermindState.updateCurrentSlotIndex();
}

function updateButtonStates(app) {
  const setCodeButton = app.querySelector("#open-set-code");
  const submitButton = app.querySelector("#submit-guess");
  const resetButton = app.querySelector("#reset-game");

  if (!setCodeButton || !submitButton || !resetButton) return;

  const secretCode = MastermindState.getSecretCode();
  const attemptsNumber = MastermindState.getAttemptsNumber();
  const colorsArray = MastermindState.getColorsArray();

  const isCodeSet = secretCode.length === 4;
  const hasMadeFirstGuess = attemptsNumber > 0;
  const guessSlotsCount = colorsArray.length;

  setCodeButton.disabled = hasMadeFirstGuess;
  submitButton.disabled = !(isCodeSet && guessSlotsCount === 4);
  resetButton.disabled = !hasMadeFirstGuess;
}

function reportClues(
  { wellPlacedColors, misplacedColors, notInCodeColors },
  app,
) {
  const cluesSection = app.querySelector("#clues");
  const wellPlacedColorsReportArea = cluesSection.querySelector("#well-placed");
  const misplacedColorsReportArea = cluesSection.querySelector("#misplaced");
  const notInCodeColorsReportArea = cluesSection.querySelector("#not-in-code");

  cluesSection.classList.remove("hidden");

  wellPlacedColorsReportArea.innerHTML =
    "<strong>Well placed</strong>: " + (wellPlacedColors.join(", ") || "None");
  misplacedColorsReportArea.innerHTML =
    "<strong>Misplaced</strong>: " + (misplacedColors.join(", ") || "None");
  notInCodeColorsReportArea.innerHTML =
    "<strong>Not in code</strong>: " + (notInCodeColors.join(", ") || "None");
}

function showSecretCodeModal(app) {
  const secretCodeModal = app.querySelector("#secret-code-modal");

  secretCodeModal.classList.remove("hidden");
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
  updateTemporarySlotUI,
  resetTemporarySlotsUI,
  reRenderSlots,
  updateButtonStates,
  reportClues,
  showSecretCodeModal,
};

// src\javascript\document\manipulation.js

import { generateApp } from "../components/functional.js";
import { MastermindState } from "../state/management.js";

function showElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}

function getHtmlElement(originElement, cssSelector) {
  return originElement.querySelector(cssSelector);
}

function getHtmlElementsArray(originElement, cssSelector) {
  return originElement.querySelectorAll(cssSelector);
}

function displayApp() {
  const app = getHtmlElement(document, "#app");

  app.innerHTML = `
    ${generateApp()}
  `;

  return app;
}

function updateSlotUI(button, app) {
  const colorsArray = MastermindState.getColorsArray();
  const secretCode = MastermindState.getSecretCode();

  if (colorsArray.length < secretCode.length) {
    const color = button.getAttribute("data-color");
    MastermindState.addChosenColorToColorsArray(color);

    const slotsArray = getHtmlElementsArray(app, ".slot");

    const currentSlotIndex = MastermindState.getCurrentSlotIndex();

    slotsArray[currentSlotIndex].style.backgroundColor = color;

    MastermindState.incrementCurrentSlotIndex();
  }
}

function reportIssueIfInvalidAttempt(app) {
  const reportArea = getHtmlElement(app, "#message");

  reportArea.innerHTML = "Please select exactly 4 colors.";
}

function reportVictory(app) {
  const reportArea = getHtmlElement(app, "#message");

  reportArea.innerHTML = "You guessed the secret code! You win!";
}

function reportLoss(app) {
  const reportArea = getHtmlElement(app, "#message");

  reportArea.innerHTML = "No more attempts left. You lost!";
}

function reportIncorrectGuess(app) {
  const reportArea = getHtmlElement(app, "#message");
  const attemptsNumberMax = MastermindState.getAttemptsNumberMax();
  const attemptsNumber = MastermindState.getAttemptsNumber();

  reportArea.innerHTML = `Incorrect guess. ${attemptsNumberMax - attemptsNumber} attempt(s) remaining. Try again!`;
}

function resetSlotsForNextGuess(app) {
  MastermindState.resetColorsArray();

  const slotsArray = getHtmlElementsArray(app, ".slot");

  slotsArray.forEach((slot) => {
    slot.style.backgroundColor = "var(--primary-color-shade-7)";
  });

  MastermindState.resetCurrentSlotIndex();
}

function disableButton(button) {
  button.disabled = true;
  button.style.backgroundColor = "var(--primary-color-shade-7)";
  button.style.color = "var(--primary-color-shade-3)";
  button.style.opacity = 0.5;
  button.style.cursor = "not-allowed";
}

function disableSubmitButton(app) {
  const submitButton = getHtmlElement(app, "#submit-guess");
  if (submitButton) {
    disableButton(submitButton);
  }
}

function updateTemporarySlotUI(button, app) {
  if (MastermindState.getTemporarySecretCode().length < 4) {
    const color = button.getAttribute("data-color");
    const modalSlotsArray = getHtmlElementsArray(
      app,
      "#secret-code-modal .slot",
    );
    const currentTemporarySlotIndex =
      MastermindState.getCurrentTemporarySlotIndex();

    MastermindState.addColorToTemporarySecretCode(color);
    modalSlotsArray[currentTemporarySlotIndex].style.backgroundColor = color;
    MastermindState.incrementCurrentTemporarySlotIndex();
  }
}

function resetTemporarySlotsUI(secretCodeModal) {
  const modalSlotsArray = getHtmlElementsArray(secretCodeModal, ".slot");
  modalSlotsArray.forEach(
    (slot) => (slot.style.backgroundColor = "var(--primary-color-shade-7)"),
  );

  MastermindState.resetCurrentTemporarySlotIndex();
}

function reRenderSlots(app) {
  const slots = getHtmlElementsArray(app, ".slot");

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
  const setCodeButton = getHtmlElement(app, "#open-set-code");
  const submitButton = getHtmlElement(app, "#submit-guess");
  const resetButton = getHtmlElement(app, "#reset-game");

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
  const cluesSection = getHtmlElement(app, "#clues");
  const wellPlacedColorsReportArea = getHtmlElement(
    cluesSection,
    "#well-placed",
  );
  const misplacedColorsReportArea = getHtmlElement(cluesSection, "#misplaced");
  const notInCodeColorsReportArea = getHtmlElement(
    cluesSection,
    "#not-in-code",
  );

  showElement(cluesSection);

  wellPlacedColorsReportArea.innerHTML =
    "<strong>Well placed</strong>: " + (wellPlacedColors.join(", ") || "None");
  misplacedColorsReportArea.innerHTML =
    "<strong>Misplaced</strong>: " + (misplacedColors.join(", ") || "None");
  notInCodeColorsReportArea.innerHTML =
    "<strong>Not in code</strong>: " + (notInCodeColors.join(", ") || "None");
}

function showSecretCodeModal(app) {
  const secretCodeModal = getHtmlElement(app, "#secret-code-modal");

  showElement(secretCodeModal);
}

function reportBoundaryViolation(app, slotsCount) {
  const reportArea = getHtmlElement(app, "#message");
  reportArea.innerHTML = `You already have ${slotsCount} colors selected. Click a slot to remove one if you want to change your guess.`;
}

function reportStartOfGame(app) {
  const reportArea = getHtmlElement(app, "#message");
  reportArea.innerHTML = "Your secret code is now set. Start guessing!";
}

function removeAnyReport(app) {
  const reportArea = getHtmlElement(app, "#message");
  reportArea.innerHTML = "";
}

export {
  showElement,
  hideElement,
  getHtmlElement,
  getHtmlElementsArray,
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
  reportBoundaryViolation,
  reportStartOfGame,
  removeAnyReport,
};

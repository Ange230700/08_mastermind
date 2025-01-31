// src\javascript\events\handlers.js

import {
  disableSubmitButton,
  displayApp,
  reportIncorrectGuess,
  reportIssueIfInvalidAttempt,
  reportLoss,
  reportVictory,
  resetSlotsForNextGuess,
  updateSlotUI,
  updateTemporarySlotUI,
  resetTemporarySlotsUI,
  reRenderSlots,
  updateButtonStates,
  reportClues,
  showSecretCodeModal,
} from "../document/manipulation.js";
import { computeClues } from "../helpers/utilities.js";
import { MastermindState } from "../state/management.js";
import {
  waitForClickOnColorButtons,
  waitForClickOnSubmitButton,
  waitForClickOnOpenSetCodeButton,
  waitForClickOnCancelSetCodeButton,
  waitForClickOnConfirmSetCodeButton,
  waitForClickOnColorButtonsInModal,
  waitForClickOnSlots,
  waitForClickOnResetButton,
} from "./listeners.js";

const runApp = (app) => {
  waitForClickOnColorButtons(app);
  waitForClickOnSubmitButton(app);
  waitForClickOnOpenSetCodeButton(app);
  waitForClickOnCancelSetCodeButton(app);
  waitForClickOnColorButtonsInModal(app);
  waitForClickOnConfirmSetCodeButton(app);
  waitForClickOnSlots(app);
  waitForClickOnResetButton(app);
};

const handleLoadingOfDomContent = () => {
  const app = displayApp();
  MastermindState.resetAppState();
  runApp(app);
  updateButtonStates(app);
};

const handleClickOnColorButtons = (button, app) => {
  updateSlotUI(button, app);
  updateButtonStates(app);
};

const handleClickOnSubmitButton = (app) => {
  const isColorsArrayValid = MastermindState.checkIfColorsArrayIsValid();
  if (!isColorsArrayValid) {
    reportIssueIfInvalidAttempt(app);
    return;
  }

  MastermindState.incrementAttemptsNumber();

  const hasPlayerWon = MastermindState.hasPlayerWon();
  if (hasPlayerWon) {
    const cluesSection = app.querySelector("#clues");
    cluesSection.classList.add("hidden");

    reportVictory(app);
    disableSubmitButton(app);
    updateButtonStates(app);
    return;
  }

  if (MastermindState.hasPlayerLost()) {
    const cluesSection = app.getElementById("clues");
    cluesSection.classList.add("hidden");

    reportLoss(app);
    disableSubmitButton(app);
    updateButtonStates(app);
    return;
  }

  const colorsArray = MastermindState.getColorsArray();
  const secretCode = MastermindState.getSecretCode();
  const cluesArraysCollection = computeClues(colorsArray, secretCode);
  const { wellPlacedColors, misplacedColors, notInCodeColors } =
    cluesArraysCollection;

  reportClues({ wellPlacedColors, misplacedColors, notInCodeColors }, app);
  reportIncorrectGuess(app);
  resetSlotsForNextGuess(app);
  updateButtonStates(app);
};

const handleColorButtonForSecretCode = (button, app) => {
  updateTemporarySlotUI(button, app);
};

const handleConfirmSecretCode = (app) => {
  const temporarySecretCode = MastermindState.getTemporarySecretCode();
  if (temporarySecretCode.length !== 4) {
    const modalReportArea = app.querySelector("#modal-message");
    modalReportArea.innerHTML =
      "Please select exactly 4 colors for the secret code.";
    return;
  }

  MastermindState.setSecretCode(MastermindState.getTemporarySecretCode());

  const secretCodeModal = app.querySelector("#secret-code-modal");
  secretCodeModal.classList.add("hidden");

  const reportArea = app.querySelector("#message");
  reportArea.innerHTML = "Your secret code is now set. Start guessing!";

  MastermindState.resetTemporarySecretCode();
  resetTemporarySlotsUI(secretCodeModal);

  const modalReportArea = app.querySelector("#modal-message");
  modalReportArea.innerHTML = "";

  updateButtonStates(app);
};

const handleClickOnOpenSetCodeButton = (app) => {
  showSecretCodeModal(app);
};

const handleClickOnCancelSetCodeButton = (app) => {
  const secretCodeModal = app.querySelector("#secret-code-modal");
  secretCodeModal.classList.add("hidden");
  MastermindState.resetTemporarySecretCode();
  resetTemporarySlotsUI(secretCodeModal);
};

const handleClickOnSlot = (slotIndex, app) => {
  MastermindState.removeColorFromColorsArray(slotIndex);
  reRenderSlots(app);
  updateButtonStates(app);
};

const handleClickOnResetButton = (app) => {
  MastermindState.resetAppState();

  reRenderSlots(app);

  const reportArea = app.querySelector("#message");
  reportArea.innerHTML = "";

  const submitButton = app.querySelector("#submit-guess");
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.innerHTML = "Submit Guess";
  }

  const cluesSection = app.querySelector("#clues");
  cluesSection.classList.add("hidden");

  updateButtonStates(app);
};

export {
  handleLoadingOfDomContent,
  handleClickOnColorButtons,
  handleClickOnSubmitButton,
  handleColorButtonForSecretCode,
  handleConfirmSecretCode,
  handleClickOnOpenSetCodeButton,
  handleClickOnCancelSetCodeButton,
  handleClickOnSlot,
  handleClickOnResetButton,
};

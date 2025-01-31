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
  reportBoundaryViolation,
  reportStartOfGame,
  removeAnyReport,
  getHtmlElement,
  hideElement,
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
  const colorsArray = MastermindState.getColorsArray();
  const slotsCount = MastermindState.getSlotsCount();

  if (colorsArray.length >= slotsCount) {
    reportBoundaryViolation(app, slotsCount);
    return;
  }

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
    const cluesSection = getHtmlElement(app, "#clues");
    hideElement(cluesSection);

    reportVictory(app);
    disableSubmitButton(app);
    updateButtonStates(app);
    return;
  }

  if (MastermindState.hasPlayerLost()) {
    const cluesSection = app.getElementById("clues");
    hideElement(cluesSection);

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
  const slotsCount = MastermindState.getSlotsCount();
  if (temporarySecretCode.length !== slotsCount) {
    const modalReportArea = getHtmlElement(app, "#modal-message");
    modalReportArea.innerHTML = `Please select exactly ${slotsCount} colors for the secret code.`;
    return;
  }

  MastermindState.setSecretCode(MastermindState.getTemporarySecretCode());

  const secretCodeModal = getHtmlElement(app, "#secret-code-modal");
  hideElement(secretCodeModal);

  reportStartOfGame(app);

  MastermindState.resetTemporarySecretCode();
  resetTemporarySlotsUI(secretCodeModal);

  const modalReportArea = getHtmlElement(app, "#modal-message");
  modalReportArea.innerHTML = "";

  updateButtonStates(app);
};

const handleClickOnOpenSetCodeButton = (app) => {
  showSecretCodeModal(app);
};

const handleClickOnCancelSetCodeButton = (app) => {
  const secretCodeModal = getHtmlElement(app, "#secret-code-modal");
  hideElement(secretCodeModal);
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

  removeAnyReport(app);

  const submitButton = getHtmlElement(app, "#submit-guess");
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.innerHTML = "Submit Guess";
  }

  const cluesSection = getHtmlElement(app, "#clues");
  hideElement(cluesSection);

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

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
  updateTempSlotUI,
  resetTempSlotsUI,
  setSecretCode,
} from "../document/manipulation.js";
import {
  checkIfColorsArrayIsValid,
  hasPlayerLost,
  hasPlayerWon,
  resetTempSecretCode,
} from "../helpers/utilities.js";
import { globalVariables, resetAppState } from "../state/management.js";
import {
  waitForClickOnColorButtons,
  waitForClickOnSubmitButton,
  waitForClickOnOpenSetCodeButton,
  waitForClickOnCancelSetCodeButton,
  waitForClickOnConfirmSetCodeButton,
  waitForClickOnColorButtonsInModal,
} from "./listeners.js";

const handleLoadingOfDomContent = () => {
  displayApp();
  resetAppState();

  waitForClickOnColorButtons();
  waitForClickOnSubmitButton();
  waitForClickOnOpenSetCodeButton();
  waitForClickOnCancelSetCodeButton();
  waitForClickOnConfirmSetCodeButton();
  waitForClickOnColorButtonsInModal();
};

const handleClickOnColorButtons = (button) => {
  updateSlotUI(button);
};

const handleClickOnSubmitButton = () => {
  if (!checkIfColorsArrayIsValid()) {
    reportIssueIfInvalidAttempt();
    return;
  }

  globalVariables.attempts_number++;

  if (hasPlayerWon()) {
    reportVictory();
    disableSubmitButton();
    return;
  }

  if (hasPlayerLost()) {
    reportLoss();
    disableSubmitButton();
    return;
  }

  reportIncorrectGuess();
  resetSlotsForNextGuess();
};

const handleColorButtonForSecretCode = (button) => {
  updateTempSlotUI(button);
};

const handleConfirmSecretCode = () => {
  if (globalVariables.temp_secret_code.length !== 4) {
    document.getElementById("modal-message").innerHTML =
      "Please select exactly 4 colors for the secret code.";
    return;
  }

  // Set the real secret code
  setSecretCode(globalVariables.temp_secret_code);

  // Hide the modal
  document.getElementById("secret-code-modal").classList.add("hidden");
  // Reset the temporary arrays/slots
  resetTempSecretCode();
  resetTempSlotsUI();
  document.getElementById("modal-message").innerHTML = "";
};

const handleClickOnOpenSetCodeButton = () => {
  // Show modal
  document.getElementById("secret-code-modal").classList.remove("hidden");
};

const handleClickOnCancelSetCodeButton = () => {
  // Hide modal, reset the temp arrays/slots
  document.getElementById("secret-code-modal").classList.add("hidden");
  resetTempSecretCode();
  resetTempSlotsUI();
};

export {
  handleLoadingOfDomContent,
  handleClickOnColorButtons,
  handleClickOnSubmitButton,
  handleColorButtonForSecretCode,
  handleConfirmSecretCode,
  handleClickOnOpenSetCodeButton,
  handleClickOnCancelSetCodeButton,
};

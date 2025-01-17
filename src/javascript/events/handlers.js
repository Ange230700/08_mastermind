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
  reRenderSlots,
} from "../document/manipulation.js";
import {
  checkIfColorsArrayIsValid,
  hasPlayerLost,
  hasPlayerWon,
  resetTempSecretCode,
  removeColorFromColorsArray,
} from "../helpers/utilities.js";
import { globalVariables, resetAppState } from "../state/management.js";
import {
  waitForClickOnColorButtons,
  waitForClickOnSubmitButton,
  waitForClickOnOpenSetCodeButton,
  waitForClickOnCancelSetCodeButton,
  waitForClickOnConfirmSetCodeButton,
  waitForClickOnColorButtonsInModal,
  waitForClickOnSlots,
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
  waitForClickOnSlots();
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

export function handleClickOnSlot(slotIndex) {
  // Only remove if there’s actually a color at that position.
  // (e.g., if the player has filled 3 colors, indices 0, 1, 2 are valid.)
  // If slotIndex is outside the array length, do nothing.
  if (slotIndex < globalVariables.colors_array.length) {
    removeColorFromColorsArray(slotIndex);
    reRenderSlots();
  }
}

export {
  handleLoadingOfDomContent,
  handleClickOnColorButtons,
  handleClickOnSubmitButton,
  handleColorButtonForSecretCode,
  handleConfirmSecretCode,
  handleClickOnOpenSetCodeButton,
  handleClickOnCancelSetCodeButton,
};

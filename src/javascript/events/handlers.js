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
  reRenderSlots,
  updateButtonStates,
  reportClues,
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

const handleLoadingOfDomContent = () => {
  displayApp();
  MastermindState.resetAppState();

  waitForClickOnColorButtons();
  waitForClickOnSubmitButton();
  waitForClickOnOpenSetCodeButton();
  waitForClickOnCancelSetCodeButton();
  waitForClickOnConfirmSetCodeButton();
  waitForClickOnColorButtonsInModal();
  waitForClickOnSlots();
  waitForClickOnResetButton();

  updateButtonStates();
};

const handleClickOnColorButtons = (button) => {
  updateSlotUI(button);
  updateButtonStates();
};

const handleClickOnSubmitButton = () => {
  if (!MastermindState.checkIfColorsArrayIsValid()) {
    reportIssueIfInvalidAttempt();
    return;
  }

  MastermindState.incrementAttemptsNumber();

  if (MastermindState.hasPlayerWon()) {
    const cluesDiv = document.getElementById("clues");
    cluesDiv.classList.add("hidden");
    reportVictory();
    disableSubmitButton();
    updateButtonStates();
    return;
  }

  if (MastermindState.hasPlayerLost()) {
    const cluesDiv = document.getElementById("clues");
    cluesDiv.classList.add("hidden");
    reportLoss();
    disableSubmitButton();
    updateButtonStates();
    return;
  }

  reportClues(
    computeClues(
      MastermindState.getColorsArray(),
      MastermindState.getSecretCode(),
    ),
  );

  reportIncorrectGuess();
  resetSlotsForNextGuess();
  updateButtonStates();
};

const handleColorButtonForSecretCode = (button) => {
  updateTempSlotUI(button);
};

const handleConfirmSecretCode = () => {
  if (MastermindState.getTempSecretCode().length !== 4) {
    document.getElementById("modal-message").innerHTML =
      "Please select exactly 4 colors for the secret code.";
    return;
  }

  // Set the real secret code
  MastermindState.setSecretCode(MastermindState.getTempSecretCode());

  // Hide the modal
  document.getElementById("secret-code-modal").classList.add("hidden");

  // Show a message that the code is now set
  document.getElementById("message").innerHTML =
    "Your secret code is now set. Start guessing!";

  // Reset the temporary arrays/slots
  MastermindState.resetTempSecretCode();
  resetTempSlotsUI();

  document.getElementById("modal-message").innerHTML = "";

  // <-- Trigger the UI update once the secret code is set
  updateButtonStates();
};

const handleClickOnOpenSetCodeButton = () => {
  // Show modal
  document.getElementById("secret-code-modal").classList.remove("hidden");
};

const handleClickOnCancelSetCodeButton = () => {
  // Hide modal, reset the temp arrays/slots
  document.getElementById("secret-code-modal").classList.add("hidden");
  MastermindState.resetTempSecretCode();
  resetTempSlotsUI();
};

const handleClickOnSlot = (slotIndex) => {
  MastermindState.removeColorFromColorsArray(slotIndex);
  reRenderSlots();
  updateButtonStates();
};

const handleClickOnResetButton = () => {
  // 1. Reset global state
  MastermindState.resetAppState();

  // 2. Re-render the empty slots
  reRenderSlots();

  // 3. Clear messages
  document.getElementById("message").innerHTML = "";

  // 4. Re-enable "Submit Guess" button
  const submitButton = document.getElementById("submit-guess");
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.innerHTML = "Submit Guess";
  }

  // 5. Hide the clues again
  document.getElementById("clues").classList.add("hidden");

  // 5. Re-show/hide relevant buttons
  updateButtonStates();
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

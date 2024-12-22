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
} from "../document/manipulation.js";
import {
  checkIfColorsArrayIsValid,
  hasPlayerLost,
  hasPlayerWon,
} from "../helpers/utilities.js";
import { globalVariables, resetAppState } from "../state/management.js";
import {
  waitForClickOnColorButtons,
  waitForClickOnSubmitButton,
} from "./listeners.js";

const handleLoadingOfDomContent = () => {
  displayApp();
  resetAppState();

  waitForClickOnColorButtons();
  waitForClickOnSubmitButton();
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

export {
  handleLoadingOfDomContent,
  handleClickOnColorButtons,
  handleClickOnSubmitButton,
};

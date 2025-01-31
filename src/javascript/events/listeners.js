// src\javascript\events\listeners.js

import {
  getHtmlElement,
  getHtmlElementsArray,
} from "../document/manipulation.js";
import {
  handleClickOnColorButtons,
  handleClickOnSubmitButton,
  handleLoadingOfDomContent,
  handleColorButtonForSecretCode,
  handleConfirmSecretCode,
  handleClickOnCancelSetCodeButton,
  handleClickOnOpenSetCodeButton,
  handleClickOnSlot,
  handleClickOnResetButton,
} from "./handlers.js";

function waitForLoadingOfDomContent() {
  document.addEventListener("DOMContentLoaded", handleLoadingOfDomContent);
}

function waitForClickOnColorButtons(app) {
  const colorButtonsArray = getHtmlElementsArray(
    app,
    ".colors-container .color-button",
  );
  colorButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
      handleClickOnColorButtons(button, app);
    });
  });
}

function waitForClickOnSubmitButton(app) {
  const submitGuessButton = getHtmlElement(app, "#submit-guess");
  submitGuessButton.addEventListener("click", () => {
    handleClickOnSubmitButton(app);
  });
}

function waitForClickOnOpenSetCodeButton(app) {
  const modalButton = getHtmlElement(app, "#open-set-code");
  modalButton.addEventListener("click", () => {
    handleClickOnOpenSetCodeButton(app);
  });
}

function waitForClickOnCancelSetCodeButton(app) {
  const cancelButton = getHtmlElement(app, "#cancel-secret-code");
  cancelButton.addEventListener("click", () => {
    handleClickOnCancelSetCodeButton(app);
  });
}

function waitForClickOnColorButtonsInModal(app) {
  const modalColorButtonsArray = getHtmlElementsArray(
    app,
    "#secret-code-modal .color-button",
  );
  modalColorButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
      handleColorButtonForSecretCode(button, app);
    });
  });
}

function waitForClickOnConfirmSetCodeButton(app) {
  const confirmButton = getHtmlElement(app, "#confirm-secret-code");
  confirmButton.addEventListener("click", () => {
    handleConfirmSecretCode(app);
  });
}

function waitForClickOnSlots(app) {
  const slotsArray = getHtmlElementsArray(app, ".slot");
  slotsArray.forEach((slot) => {
    slot.addEventListener("click", () => {
      const slotIndex = Number(slot.getAttribute("data-slot-index"));
      handleClickOnSlot(slotIndex, app);
    });
  });
}

function waitForClickOnResetButton(app) {
  const resetButton = getHtmlElement(app, "#reset-game");
  resetButton.addEventListener("click", () => {
    handleClickOnResetButton(app);
  });
}

export {
  waitForLoadingOfDomContent,
  waitForClickOnColorButtons,
  waitForClickOnSubmitButton,
  waitForClickOnOpenSetCodeButton,
  waitForClickOnCancelSetCodeButton,
  waitForClickOnColorButtonsInModal,
  waitForClickOnConfirmSetCodeButton,
  waitForClickOnSlots,
  waitForClickOnResetButton,
};

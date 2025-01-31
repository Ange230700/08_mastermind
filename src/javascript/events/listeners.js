// src\javascript\events\listeners.js

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
  const colorButtonsArray = app.querySelectorAll(
    ".colors-container .color-button",
  );
  colorButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
      handleClickOnColorButtons(button, app);
    });
  });
}

function waitForClickOnSubmitButton(app) {
  const submitGuessButton = app.querySelector("#submit-guess");
  submitGuessButton.addEventListener("click", () => {
    handleClickOnSubmitButton(app);
  });
}

function waitForClickOnOpenSetCodeButton(app) {
  const modalButton = app.querySelector("#open-set-code");
  modalButton.addEventListener("click", () => {
    handleClickOnOpenSetCodeButton(app);
  });
}

function waitForClickOnCancelSetCodeButton(app) {
  const cancelButton = app.querySelector("#cancel-secret-code");
  cancelButton.addEventListener("click", () => {
    handleClickOnCancelSetCodeButton(app);
  });
}

function waitForClickOnColorButtonsInModal(app) {
  const modalColorButtonsArray = app.querySelectorAll(
    "#secret-code-modal .color-button",
  );
  modalColorButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
      handleColorButtonForSecretCode(button, app);
    });
  });
}

function waitForClickOnConfirmSetCodeButton(app) {
  const confirmButton = app.querySelector("#confirm-secret-code");
  confirmButton.addEventListener("click", () => {
    handleConfirmSecretCode(app);
  });
}

function waitForClickOnSlots(app) {
  const slotsArray = app.querySelectorAll(".slot");
  slotsArray.forEach((slot) => {
    slot.addEventListener("click", () => {
      const slotIndex = Number(slot.getAttribute("data-slot-index"));
      handleClickOnSlot(slotIndex, app);
    });
  });
}

function waitForClickOnResetButton(app) {
  const resetButton = app.querySelector("#reset-game");
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

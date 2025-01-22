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

function waitForClickOnColorButtons() {
  document
    .querySelectorAll(".colors-container .color-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        handleClickOnColorButtons(button);
      });
    });
}

function waitForClickOnSubmitButton() {
  document
    .getElementById("submit-guess")
    .addEventListener("click", handleClickOnSubmitButton);
}

function waitForClickOnOpenSetCodeButton() {
  const button = document.getElementById("open-set-code");
  if (!button) return;
  button.addEventListener("click", handleClickOnOpenSetCodeButton);
}

function waitForClickOnCancelSetCodeButton() {
  document
    .getElementById("cancel-secret-code")
    ?.addEventListener("click", handleClickOnCancelSetCodeButton);
}

function waitForClickOnColorButtonsInModal() {
  document
    .querySelectorAll("#secret-code-modal .color-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        handleColorButtonForSecretCode(button);
      });
    });
}

function waitForClickOnConfirmSetCodeButton() {
  document
    .getElementById("confirm-secret-code")
    ?.addEventListener("click", handleConfirmSecretCode);
}

function waitForClickOnSlots() {
  // Select all .slot elements
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("click", () => {
      handleClickOnSlot(Number(slot.getAttribute("data-slot-index")));
    });
  });
}

function waitForClickOnResetButton() {
  document
    .getElementById("reset-game")
    .addEventListener("click", handleClickOnResetButton);
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

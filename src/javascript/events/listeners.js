// src\javascript\events\listeners.js

import {
  handleClickOnColorButtons,
  handleClickOnSubmitButton,
  handleLoadingOfDomContent,
  handleColorButtonForSecretCode,
  handleConfirmSecretCode,
  handleClickOnCancelSetCodeButton,
  handleClickOnOpenSetCodeButton,
} from "./handlers.js";

function waitForLoadingOfDomContent() {
  document.addEventListener("DOMContentLoaded", handleLoadingOfDomContent);
}

function waitForClickOnColorButtons() {
  document.querySelectorAll(".color-button").forEach((button) => {
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
  const confirmButton = document.getElementById("confirm-secret-code");
  if (!confirmButton) return;
  confirmButton.addEventListener("click", handleConfirmSecretCode);
}

export {
  waitForLoadingOfDomContent,
  waitForClickOnColorButtons,
  waitForClickOnSubmitButton,
  waitForClickOnOpenSetCodeButton,
  waitForClickOnCancelSetCodeButton,
  waitForClickOnColorButtonsInModal,
  waitForClickOnConfirmSetCodeButton,
};

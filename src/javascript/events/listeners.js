// src\javascript\events\listeners.js

import {
  handleClickOnColorButtons,
  handleClickOnSubmitButton,
  handleLoadingOfDomContent,
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

export {
  waitForLoadingOfDomContent,
  waitForClickOnColorButtons,
  waitForClickOnSubmitButton,
};

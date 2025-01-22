// src\javascript\helpers\utilities.js

import { globalVariables } from "../state/management.js";

function resetColorsArray() {
  globalVariables.colors_array = [];
}

function addChosenColorToColorsArray(color) {
  globalVariables.colors_array.push(color);
}

function checkIfColorsArrayIsValid() {
  return (
    Array.isArray(globalVariables.colors_array) &&
    globalVariables.colors_array.length === 4
  );
}

function checkIfColorsArrayIsStrictlyEqualsToSecretCode() {
  for (let index in globalVariables.secret_code) {
    if (
      globalVariables.colors_array[index] !== globalVariables.secret_code[index]
    ) {
      return false;
    }
  }

  return true;
}

function hasPlayerWon() {
  return checkIfColorsArrayIsStrictlyEqualsToSecretCode() || false;
}

function hasPlayerLost() {
  return (
    globalVariables.attempts_number_max - globalVariables.attempts_number ===
      0 || false
  );
}

function resetTempSecretCode() {
  globalVariables.temp_secret_code = [];
}

function addColorToTempSecretCode(color) {
  globalVariables.temp_secret_code.push(color);
}

function removeColorFromColorsArray(index) {
  globalVariables.colors_array.splice(index, 1);
}

export {
  checkIfColorsArrayIsValid,
  hasPlayerWon,
  hasPlayerLost,
  resetColorsArray,
  addChosenColorToColorsArray,
  resetTempSecretCode,
  addColorToTempSecretCode,
  removeColorFromColorsArray,
};

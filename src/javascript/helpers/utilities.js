// src\javascript\helpers\utilities.js

import { globalVariables } from "../state/management.js";

function chooseColorInPossibleColorsList(index) {
  return globalVariables.possible_colors_list[index];
}

function resetColorsArray() {
  globalVariables.colors_array = [];
}

function addChosenColorToColorsArray(index) {
  globalVariables.colors_array.push(chooseColorInPossibleColorsList(index));
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
  if (!checkIfColorsArrayIsValid()) {
    return false;
  }

  return checkIfColorsArrayIsStrictlyEqualsToSecretCode() || false;
}

function hasPlayerLost() {
  return (
    globalVariables.attempts_number_max - globalVariables.attempts_number ===
      0 || false
  );
}

function makeWinMove() {
  resetColorsArray();
  addChosenColorToColorsArray(
    globalVariables.possible_colors_list.indexOf("blue"),
  );
  addChosenColorToColorsArray(
    globalVariables.possible_colors_list.indexOf("blue"),
  );
  addChosenColorToColorsArray(
    globalVariables.possible_colors_list.indexOf("yellow"),
  );
  addChosenColorToColorsArray(
    globalVariables.possible_colors_list.indexOf("green"),
  );
}

function makeAttempt() {
  resetColorsArray();
  while (!checkIfColorsArrayIsValid()) {
    if (
      globalVariables.attempts_number_max - globalVariables.attempts_number ===
      Math.floor(Math.random() * globalVariables.attempts_number_max)
    ) {
      makeWinMove();
      break;
    }
    addChosenColorToColorsArray(
      Math.floor(Math.random() * globalVariables.possible_colors_list.length),
    );
  }

  globalVariables.attempts_number++;

  if (hasPlayerWon()) {
    console.log("Player won.");
    return;
  }

  if (hasPlayerLost()) {
    console.log("Player lost.");
    return;
  }

  console.log(
    `Input not valid or secret code not found. Try again, ${globalVariables.attempts_number_max - globalVariables.attempts_number} attempt(s) remaining though.`,
  );
  makeAttempt();
}

function play() {
  makeAttempt();
}

export { play };

// src\javascript\helpers\utilities.js

import { globalVariables } from "../state/management.js";

function askUserTry() {
  return prompt(
    `Enter 4 colors separated by space to guess the secret code. Like in the following double quotes: "white cyan magenta turquoise"`,
  );
}

function checkUserInput(userTry) {
  return (typeof userTry === "string" && userTry !== "") || false;
}

function convertUserTryToArray(userTry) {
  return checkUserInput(userTry) ? userTry.split(" ") : [];
}

function checkIfColorsArrayIsValid(userTry) {
  return (
    (Array.isArray(convertUserTryToArray(userTry)) &&
      convertUserTryToArray(userTry).length === 4) ||
    false
  );
}

function checkIfColorsArrayIsStrictlyEqualsToSecretCode(userTry) {
  const colorsArray = convertUserTryToArray(userTry);

  for (let index in colorsArray) {
    if (colorsArray[index] !== globalVariables.secret_code[index]) {
      return false;
    }
  }

  return true;
}

function hasPlayerWon(userTry) {
  if (!checkIfColorsArrayIsValid(userTry)) {
    return false;
  }

  return checkIfColorsArrayIsStrictlyEqualsToSecretCode(userTry) || false;
}

function hasPlayerLost() {
  return (
    globalVariables.attempts_number_max - globalVariables.attempts_number ===
      0 || false
  );
}

function makeAttempt(userTry = "") {
  userTry = askUserTry();
  globalVariables.attempts_number++;

  if (hasPlayerWon(userTry)) {
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
  makeAttempt(userTry);
}

function play() {
  makeAttempt();
}

export { play };

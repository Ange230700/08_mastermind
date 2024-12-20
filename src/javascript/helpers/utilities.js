// src\javascript\helpers\utilities.js

import { globalVariables } from "../state/management.js";

function askUserTry() {
  return prompt(
    `Enter 4 colors separated by space to guess the secret code. Like in the following double quote: "white cyan magenta turquoise"`,
  );
}

function convertUserTryToArray(userTry) {
  if (typeof userTry === "string" && userTry !== "") {
    console.log(userTry.split(" "));
    return userTry.split(" ");
  }

  return [];
}

function checkIfColorsArrayIsValid(userTry) {
  return (
    (Array.isArray(convertUserTryToArray(userTry)) &&
      convertUserTryToArray(userTry).length === 4) ||
    false
  );
}

function hasPlayerWon(userTry) {
  return (
    convertUserTryToArray(userTry) === globalVariables.secret_code || false
  );
}

function hasPlayerLost() {
  return globalVariables.attempts_number > 12 || false;
}

function makeAttempt(userTry) {
  userTry = askUserTry();

  globalVariables.attempts_number++;
  console.log(`Attempt ${globalVariables.attempts_number}\n`);

  if (!checkIfColorsArrayIsValid(userTry)) {
    console.log("Not valid. Try again");
    return "Not valid. Try again";
  }

  if (hasPlayerWon(userTry)) {
    console.log("Player won!");
    return "Player won!";
  }

  if (hasPlayerLost()) {
    console.log("Player lost!");
    return "Player lost!";
  }

  console.log("Not secret code. try again");
  return "Not secret code. try again";
}

function play() {
  let userTry = "";
  makeAttempt(userTry);

  if (
    makeAttempt(userTry) === "Player won!" ||
    makeAttempt(userTry) === "Player lost!"
  ) {
    return;
  }

  play();
}

export { play };

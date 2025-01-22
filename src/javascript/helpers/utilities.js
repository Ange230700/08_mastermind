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
    globalVariables.attempts_number_max - globalVariables.attempts_number <=
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

// src\javascript\helpers\utilities.js

/**
 * Returns an object with counts:
 * - wellPlaced: number of colors correct in both color and position
 * - misplaced: number of colors correct in color but incorrect position
 * - notInCode: number of colors not at all in the secret code (or in surplus)
 */
function computeClues(guessArray, secretArray) {
  // Defensive: both arrays should be length 4
  if (guessArray.length !== secretArray.length) {
    return { wellPlaced: 0, misplaced: 0, notInCode: guessArray.length };
  }

  // 1. Identify well-placed
  let wellPlaced = 0;
  // We'll build frequency maps to track leftover counts after well-placed are removed
  const secretFrequency = {};
  const guessFrequency = {};

  for (let i = 0; i < secretArray.length; i++) {
    if (guessArray[i] === secretArray[i]) {
      wellPlaced++;
    } else {
      // count leftover colors from secret
      secretFrequency[secretArray[i]] =
        (secretFrequency[secretArray[i]] || 0) + 1;
      // count leftover colors from guess
      guessFrequency[guessArray[i]] = (guessFrequency[guessArray[i]] || 0) + 1;
    }
  }

  // 2. Identify misplaced
  //   A color is misplaced if it appeared in the secret code but in a different position
  //   We can only match as many times as it appears in leftover secretFrequency
  let misplaced = 0;

  for (const color in guessFrequency) {
    if (secretFrequency[color]) {
      // The number of misplaced occurrences for 'color' is the minimum
      // of leftover guess occurrences and leftover secret occurrences
      misplaced += Math.min(guessFrequency[color], secretFrequency[color]);
    }
  }

  // 3. Identify not in code
  //   notInCode = total 4 guessed - wellPlaced - misplaced
  //   Alternatively, for more advanced logic with duplicates, we might count
  //   them more precisely, but this approach is simpler.
  const notInCode = secretArray.length - (wellPlaced + misplaced);

  return { wellPlaced, misplaced, notInCode };
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
  computeClues,
};

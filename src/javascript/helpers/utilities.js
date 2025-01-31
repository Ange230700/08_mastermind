// src\javascript\helpers\utilities.js

import { MastermindState } from "../state/management.js";

/**
 * computeClues(guessArray, secretArray)
 * Returns an object with 3 arrays of colors:
 *   - wellPlacedColors
 *   - misplacedColors
 *   - notInCodeColors
 * @param {string[]} guessArray
 * @param {string[]} secretArray
 * @returns {object}
 **/
function computeClues(guessArray, secretArray) {
  if (guessArray.length !== secretArray.length) {
    return {
      wellPlacedColors: [],
      misplacedColors: [],
      notInCodeColors: guessArray.slice(),
    };
  }

  const wellPlacedColors = [];
  const leftoverSecret = [];
  const leftoverGuess = [];

  const secretCode = MastermindState.getSecretCode();
  for (let index = 0; index < secretCode.length; index++) {
    if (guessArray[index] === secretArray[index]) {
      wellPlacedColors.push(guessArray[index]);
    } else {
      leftoverSecret.push(secretArray[index]);
      leftoverGuess.push(guessArray[index]);
    }
  }

  const misplacedColors = [];
  const notInCodeColors = [];

  leftoverGuess.forEach((color) => {
    const index = leftoverSecret.indexOf(color);
    if (index !== -1) {
      misplacedColors.push(color);
      leftoverSecret.splice(index, 1);
    } else {
      notInCodeColors.push(color);
    }
  });

  return { wellPlacedColors, misplacedColors, notInCodeColors };
}

export { computeClues };

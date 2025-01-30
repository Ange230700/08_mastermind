// src\javascript\helpers\utilities.js

/**
 * computeClues(guessArray, secretArray)
 * Returns an object with 3 arrays of colors:
 *   - wellPlacedColors
 *   - misplacedColors
 *   - notInCodeColors
 */
function computeClues(guessArray, secretArray) {
  // Defensive: both arrays should be length 4
  if (guessArray.length !== secretArray.length) {
    return {
      wellPlacedColors: [],
      misplacedColors: [],
      // everything is "not in code" if length mismatch
      notInCodeColors: guessArray.slice(),
    };
  }

  const wellPlacedColors = [];
  const leftoverSecret = [];
  const leftoverGuess = [];

  // 1. Identify well-placed vs. leftovers
  for (let i = 0; i < 4; i++) {
    if (guessArray[i] === secretArray[i]) {
      wellPlacedColors.push(guessArray[i]);
    } else {
      leftoverSecret.push(secretArray[i]);
      leftoverGuess.push(guessArray[i]);
    }
  }

  // 2. Identify misplaced vs. not in code
  const misplacedColors = [];
  const notInCodeColors = [];

  leftoverGuess.forEach((color) => {
    // If leftoverSecret still contains this color
    // at some index, treat it as 'misplaced'
    const idx = leftoverSecret.indexOf(color);
    if (idx !== -1) {
      misplacedColors.push(color);
      // Remove that instance to handle duplicates properly
      leftoverSecret.splice(idx, 1);
    } else {
      // Otherwise, color not found in leftover secret
      notInCodeColors.push(color);
    }
  });

  return { wellPlacedColors, misplacedColors, notInCodeColors };
}

export { computeClues };

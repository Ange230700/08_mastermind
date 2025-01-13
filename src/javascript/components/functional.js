// src\javascript\components\functional.js

import { globalVariables } from "../state/management";

function generateColorButtons() {
  return globalVariables.possible_colors_list
    .map(
      (color) => `
        <button 
          class="color-button" 
          style="background-color: ${color}" 
          data-color="${color}"
          title="${color}">
        </button>
      `,
    )
    .join("");
}

function generateSlots() {
  let slots = "";

  for (let index = 0; index < 4; index++) {
    slots += `
      <div class="slot" data-slot-index="${index}"></div>
    `;
  }

  return slots;
}

function generateFooter() {
  return `
    <footer>
      <p>
        Check out the project on
        <strong>
          <a
            href="https://github.com/Ange230700/08_mastermind.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </strong>
      </p>
    </footer>
  `;
}

function generateApp() {
  return `
    <div class="app-container">
      <h1 class="app-title">Mastermind Game</h1>
      <p class="instructions">
        Pick 4 colors and then click "Submit Guess" to see if you cracked the code.
      </p>
      <div class="colors-container">
        ${generateColorButtons()}
      </div>
      <div class="slots-container">
        ${generateSlots()}
      </div>
      <div class="actions-container">
        <button id="submit-guess">Submit Guess</button>
      </div>
      <p id="message" class="message"></p>
    </div>
    ${generateFooter()}
  `;
}

export { generateApp };

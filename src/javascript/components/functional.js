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

function generateHeader() {
  return `
    <header>
      <h1 class="app-title">Mastermind Game</h1>
      <p class="game-description">
        Try to guess the secret combination of four colors.
      </p>
    </header>
  `;
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
    ${generateHeader()}
    <div>
      <div class="app-container">
        <div class="colors-container">
          ${generateColorButtons()}
        </div>
        <div class="slots-container">
          ${generateSlots()}
        </div>
        <div class="actions-container">
          <button class="action" id="open-set-code">Set Secret Code</button>
          <button class="action" id="submit-guess">Submit Guess</button>
          <button class="action" id="reset-game">Reset Game</button>
        </div>
        <p id="message" class="message"></p>
        <div id="clues" class="clues">
          <p id="well-placed"></p>
          <p id="misplaced"></p>
          <p id="not-in-code"></p>
        </div>
      </div>
      <div id="secret-code-modal" class="modal hidden">
        <div class="modal-content">
          <h2>Set Your Secret Code</h2>
          <p>Pick 4 colors to set the code:</p>
          <div class="code-colors-container">
            ${generateColorButtons()}
          </div>
          <div class="code-slots-container">
            ${generateSlots()}
          </div>
          <div class="modal-actions">
            <button class="action" id="confirm-secret-code">Confirm Code</button>
            <button class="action" id="cancel-secret-code">Cancel</button>
          </div>
          <p id="modal-message"></p>
        </div>
      </div>
    </div>
    ${generateFooter()}
  `;
}

export { generateApp };

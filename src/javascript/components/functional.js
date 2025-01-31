// src\javascript\components\functional.js

import { MastermindState } from "../state/management.js";

function generateColorButtons() {
  return MastermindState.getPossibleColorsList()
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
  const slotsCount = MastermindState.getSlotsCount();
  let slots = "";

  for (let index = 0; index < slotsCount; index++) {
    slots += `<div class="slot" data-slot-index="${index}"></div>`;
  }

  return slots;
}

function generateHeader() {
  return `
    <header>
      <h1 class="app-title">MASTERMIND</h1>
      <p class="game-description" style="padding: 0 1rem;">
        Mastermind is a classic logic game where you try to guess a secret combination. In that version of the game, they try to find a <strong>${MastermindState.getSlotsCount()} color combination</strong> among a set of <strong>${MastermindState.getPossibleColorsList().length} colors</strong>. And you have <strong>${MastermindState.getAttemptsNumberMax()} attempts</strong> to guess the combination. As a matter of fact, there are ${Math.pow(MastermindState.getPossibleColorsList().length, 4)} possible combinations. So to help you, there will be <strong>clues</strong> after each guess.
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
        <p id="message" class="message">First, let's set the secret code. Shall we?</p>
        <section id="clues" class="clues hidden">
          <h3 style="margin: 1rem 0">Clues</h3>
          <p id="well-placed"></p>
          <p id="misplaced"></p>
          <p id="not-in-code"></p>
        </section>
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

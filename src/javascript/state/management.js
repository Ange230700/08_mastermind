// src\javascript\state\management.js

import { resetColorsArray } from "../helpers/utilities.js";

const globalVariables = {
  secret_code: ["blue", "blue", "yellow", "green"],
  attempts_number: 0,
  attempts_number_max: 12,
  colors_array: [],
  possible_colors_list: [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "black",
  ],
  current_slot_index: 0,
};

function resetAppState() {
  globalVariables.attempts_number = 0;
  resetColorsArray();
}

export { globalVariables, resetAppState };

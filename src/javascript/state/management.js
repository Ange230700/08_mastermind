// src\javascript\state\management.js

const globalVariables = {
  secret_code: [],
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
  temp_secret_code: [],
  current_temp_slot_index: 0,
};

function resetAppState() {
  globalVariables.secret_code = [];
  globalVariables.attempts_number = 0;
  globalVariables.colors_array = [];
  globalVariables.current_slot_index = 0;
  globalVariables.temp_secret_code = [];
  globalVariables.current_temp_slot_index = 0;
}

export { globalVariables, resetAppState };

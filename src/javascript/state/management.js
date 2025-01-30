// src\javascript\state\management.js

export const MastermindState = (() => {
  let secret_code = [];
  let attempts_number = 0;
  let attempts_number_max = 12;
  let colors_array = [];
  let possible_colors_list = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "black",
  ];
  let current_slot_index = 0;
  let temp_secret_code = [];
  let current_temp_slot_index = 0;

  function resetAppState() {
    secret_code = [];
    attempts_number = 0;
    colors_array = [];
    current_slot_index = 0;
    temp_secret_code = [];
    current_temp_slot_index = 0;
  }

  function resetColorsArray() {
    colors_array = [];
  }

  function addChosenColorToColorsArray(color) {
    colors_array.push(color);
  }

  function checkIfColorsArrayIsValid() {
    return (
      Array.isArray(colors_array) &&
      colors_array.length === 4 &&
      colors_array.every((color) => possible_colors_list.includes(color))
    );
  }

  function checkIfColorsArrayIsStrictlyEqualsToSecretCode() {
    for (let index in secret_code) {
      if (colors_array[index] !== secret_code[index]) {
        return false;
      }
    }

    return true;
  }

  function hasPlayerWon() {
    return checkIfColorsArrayIsStrictlyEqualsToSecretCode() || false;
  }

  function hasPlayerLost() {
    return attempts_number_max - attempts_number <= 0 || false;
  }

  function resetTempSecretCode() {
    temp_secret_code = [];
  }

  function addColorToTempSecretCode(color) {
    temp_secret_code.push(color);
  }

  function removeColorFromColorsArray(index) {
    colors_array.splice(index, 1);
  }

  function getCurrentSlotIndex() {
    return current_slot_index;
  }

  function incrementCurrentSlotIndex() {
    current_slot_index += 1;
  }

  function resetCurrentSlotIndex() {
    current_slot_index = 0;
  }

  function getCurrentTempSlotIndex() {
    return current_temp_slot_index;
  }

  function incrementCurrentTempSlotIndex() {
    current_temp_slot_index += 1;
  }

  function resetCurrentTempSlotIndex() {
    current_temp_slot_index = 0;
  }

  function getPossibleColorsList() {
    return possible_colors_list;
  }

  function getAttemptsNumberMax() {
    return attempts_number_max;
  }

  function getAttemptsNumber() {
    return attempts_number;
  }

  function incrementAttemptsNumber() {
    attempts_number++;
  }

  function getColorsArray() {
    return colors_array;
  }

  function getTempSecretCode() {
    return temp_secret_code;
  }

  function getSecretCode() {
    return secret_code;
  }

  function setSecretCode(codeArray) {
    secret_code = [...codeArray];
  }

  function updateCurrentSlotIndex() {
    current_slot_index = colors_array.length;
  }

  return {
    resetAppState,
    resetColorsArray,
    addChosenColorToColorsArray,
    checkIfColorsArrayIsValid,
    hasPlayerWon,
    hasPlayerLost,
    resetTempSecretCode,
    addColorToTempSecretCode,
    removeColorFromColorsArray,
    getCurrentSlotIndex,
    incrementCurrentSlotIndex,
    resetCurrentSlotIndex,
    getCurrentTempSlotIndex,
    incrementCurrentTempSlotIndex,
    resetCurrentTempSlotIndex,
    getPossibleColorsList,
    getAttemptsNumberMax,
    getColorsArray,
    getAttemptsNumber,
    incrementAttemptsNumber,
    getTempSecretCode,
    getSecretCode,
    setSecretCode,
    updateCurrentSlotIndex,
  };
})();

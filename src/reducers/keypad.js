import {KEYPAD_CLEAR, KEYPAD_SET_POINT, KEYPAD_UPDATE} from "../actions";

export const KEYPAD_DEFAULT_STATE = {
  integerPart: 0,
  fractionalPart: 0,
  hasPoint: false,
  amount: 0,
};

function _calculatePartAmount(current_amount, value) {
  return parseInt(current_amount.toString() + value.toString(), 10);
}

function _calculateFractionalPartAmount(current_amount, value) {
  if (current_amount.toString().length === 2) {
    return current_amount;
  }
  return _calculatePartAmount(current_amount, value)
}

function _calculateAmount(integerPart, fractionalPart) {
  const fractionalPartStr = fractionalPart.toString().padEnd(2, 0);
  return parseInt(integerPart.toString() + fractionalPartStr, 10);
}

function updateKeypad(state, action) {
  const integerPart = !state.hasPoint
    ? _calculatePartAmount(state.integerPart, action.value)
    : state.integerPart;
  const fractionalPart = state.hasPoint
    ? _calculateFractionalPartAmount(state.fractionalPart, action.value)
    : state.fractionalPart;
  const amount = _calculateAmount(integerPart, fractionalPart);

  return {
    ...state,
    integerPart,
    fractionalPart,
    amount,
  };
}

function setHasPoint(state, action) {
  return {...state, hasPoint: true};
}

function reset(state, action) {
  return KEYPAD_DEFAULT_STATE;
}

export const keypad = {
  [KEYPAD_UPDATE]: updateKeypad,
  [KEYPAD_SET_POINT]: setHasPoint,
  [KEYPAD_CLEAR]: reset,
};

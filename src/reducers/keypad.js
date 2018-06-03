import {KEYPAD_CLEAR, KEYPAD_SET_POINT, KEYPAD_UPDATE} from "../actions";

function _calculatePartAmount(current_amount, value) {
  return parseInt(current_amount.toString() + value.toString());
}

function _calculateFractionalPartAmount(current_amount, value) {
  if (current_amount.toString().length === 2) {
    return current_amount;
  }
  return _calculatePartAmount(current_amount, value)
}

function _calculateAmount(integerPart, fractionalPart) {
  const fractionalPartStr = fractionalPart.toString().padEnd(2, 0);
  return parseInt(integerPart.toString() + fractionalPartStr);
}

export const DEFAULT_STATE = {
  integerPart: 0,
  fractionalPart: 0,
  hasPoint: false,
  amount: 0,
};

export function keypad(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case KEYPAD_UPDATE:
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

    case KEYPAD_SET_POINT:
      return {
        ...state,
        hasPoint: true,
      };

    case KEYPAD_CLEAR:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

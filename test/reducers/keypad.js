import {expect} from "chai";
import {parametrize} from "js-parametrize";

import {keypad, KEYPAD_DEFAULT_STATE} from "../../src/reducers/keypad";
import {KEYPAD_UPDATE, KEYPAD_CLEAR, KEYPAD_SET_POINT} from "../../src/actions";

describe('keypad reducer', () => {

  describe('KEYPAD_UPDATE', () => {

    const reducer = keypad[KEYPAD_UPDATE];

    parametrize([
      [
        {integerPart: 0, fractionalPart: 0, hasPoint: false, amount: 0},
        4,
        {integerPart: 4, fractionalPart: 0, hasPoint: false, amount: 400},
      ],
      [
        {integerPart: 44, fractionalPart: 0, hasPoint: false, amount: 4400},
        0,
        {integerPart: 440, fractionalPart: 0, hasPoint: false, amount: 44000},
      ],
      [
        {integerPart: 440, fractionalPart: 0, hasPoint: true, amount: 44000},
        7,
        {integerPart: 440, fractionalPart: 7, hasPoint: true, amount: 44070},
      ],
      [
        {integerPart: 440, fractionalPart: 77, hasPoint: true, amount: 44077},
        7,
        {integerPart: 440, fractionalPart: 77, hasPoint: true, amount: 44077},
      ],
    ], (initial_state, value, expected_state) => {
      it('should update keypad with provided value', () => {
        // given ... keypad state is initially as provided
        // when ... we update keypad with provided value
        let result = reducer(initial_state, {
          type: KEYPAD_UPDATE,
          value,
        });

        // then ... should update amount as expected
        expect(result).to.deep.equal(expected_state);
      });
    });
  });

  describe('KEYPAD_SET_POINT', () => {

    const reducer = keypad[KEYPAD_SET_POINT];

    it('should set point if currently no point', () => {
      // given ... keypad currently has no point
      const initial_state = {integerPart: 440, fractionalPart: 0, hasPoint: false, amount: 44000};

      // when ... we update keypad with a point
      const result = reducer(initial_state, {type: KEYPAD_SET_POINT});

      // then ... should set point
      const expected = {integerPart: 440, fractionalPart: 0, hasPoint: true, amount: 44000};
      expect(result).to.deep.equal(expected);
    });

    it('should not set point if currently already has point', () => {

      // given ... keypad currently already has a point
      const initial_state = {integerPart: 440, fractionalPart: 0, hasPoint: true, amount: 44000};

      // when ... we update keypad with a point
      const result = reducer(initial_state, {type: KEYPAD_SET_POINT});

      // then ... should not update keypad
      expect(result).to.deep.equal(initial_state);
    });
  });

  describe('KEYPAD_CLEAR', () => {

    const reducer = keypad[KEYPAD_CLEAR];

    parametrize([
      [{integerPart: 0, fractionalPart: 0, hasPoint: false, amount: 0}],
      [{integerPart: 440, fractionalPart: 77, hasPoint: true, amount: 44077}],
    ], (initial_state) => {
      it('should clear keypad', () => {
        // given ... keypad state is initially as provided
        const keypad_state = {integerPart: 440, fractionalPart: 77, hasPoint: true, amount: 44077};

        // when ... we clear the keypad
        const result = reducer(initial_state, {type: KEYPAD_CLEAR});

        // then ... should return keypad to it's default state
        expect(result).to.deep.equal(KEYPAD_DEFAULT_STATE);
      });
    });
  });
});

import {expect} from "chai";
import {keypad, KEYPAD_DEFAULT_STATE} from "../../src/reducers/keypad";
import {KEYPAD_UPDATE, KEYPAD_CLEAR, KEYPAD_SET_POINT} from "../../src/actions";

describe('keypad reducer', () => {

  describe('KEYPAD_UPDATE', () => {

    // TODO: parametrize
    it('should update keypad with provided value', () => {
      const reducer = keypad[KEYPAD_UPDATE];

      // given
      // ... keypad is currently 0.00 with no point
      let keypad_state = {integerPart: 0, fractionalPart: 0, hasPoint: false, amount: 0};

      // when ... we update keypad with 4
      let result = reducer(keypad_state, {
        type: KEYPAD_UPDATE,
        value: 4,
      });

      // then
      // ... should update amount as expected
      let expected = {integerPart: 4, fractionalPart: 0, hasPoint: false, amount: 400};
      expect(result).to.deep.equal(expected);

      // given
      // ... keypad is currently 44.00 with no point
      keypad_state = {integerPart: 44, fractionalPart: 0, hasPoint: false, amount: 4400};

      // when ... we update keypad with 0
      result = reducer(keypad_state, {
        type: KEYPAD_UPDATE,
        value: 0,
      });

      // then
      // ... should update amount as expected
      expected = {integerPart: 440, fractionalPart: 0, hasPoint: false, amount: 44000};
      expect(result).to.deep.equal(expected);

      // given
      // ... keypad is currently 440.00 ... with a point
      keypad_state = {integerPart: 440, fractionalPart: 0, hasPoint: true, amount: 44000};

      // when ... we update keypad with 7
      result = reducer(keypad_state, {
        type: KEYPAD_UPDATE,
        value: 7,
      });

      // then
      // ... should update amount as expected
      expected = {integerPart: 440, fractionalPart: 7, hasPoint: true, amount: 44070};
      expect(result).to.deep.equal(expected);

      // given
      // ... keypad is currently 440.77 with a point
      keypad_state = {integerPart: 440, fractionalPart: 77, hasPoint: true, amount: 44077};

      // when ... we update keypad with 9
      result = reducer(keypad_state, {
        type: KEYPAD_UPDATE,
        value: 7,
      });

      // then
      // ... should not update keypad
      expected = {integerPart: 440, fractionalPart: 77, hasPoint: true, amount: 44077};
      expect(result).to.deep.equal(expected);
    });
  });

  describe('KEYPAD_SET_POINT', () => {

    // TODO: parametrize
    it('should set point', () => {
      const reducer = keypad[KEYPAD_SET_POINT];

      // given
      // ... keypad is currently 440.00 with no point
      let keypad_state = {integerPart: 440, fractionalPart: 0, hasPoint: false, amount: 44000};

      // when ... we update keypad with a point
      let result = reducer(keypad_state, {type: KEYPAD_SET_POINT});

      // then
      // ... should update amount as expected
      let expected = {integerPart: 440, fractionalPart: 0, hasPoint: true, amount: 44000};
      expect(result).to.deep.equal(expected);

      // given
      // ... keypad is currently 440.00 with a point
      keypad_state = {integerPart: 440, fractionalPart: 0, hasPoint: true, amount: 44000};

      // when ... we update keypad with a point
      result = reducer(keypad_state, {type: KEYPAD_SET_POINT});

      // then
      // ... should not update keypad
      expected = {integerPart: 440, fractionalPart: 0, hasPoint: true, amount: 44000};
      expect(result).to.deep.equal(expected);
    });
  });

  describe('KEYPAD_CLEAR', () => {

    // TODO: parametrize
    it('should clear keypad', () => {
      // given
      // ... keypad is currently 440.77 with a point
      const keypad_state = {integerPart: 440, fractionalPart: 77, hasPoint: true, amount: 44077};

      // when ... we clear the keypad
      const reducer = keypad[KEYPAD_CLEAR];
      const result = reducer(keypad_state, {type: KEYPAD_CLEAR});

      // then
      // ... should return keypad to it's default state
      expect(result).to.deep.equal(KEYPAD_DEFAULT_STATE);
    });
  });
});

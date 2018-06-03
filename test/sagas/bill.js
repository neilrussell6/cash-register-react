import {expect} from "chai";
import {select, put} from "redux-saga/effects";
import {billUpdateSuccess} from "../../src/sagas/bill";
import {BILL_UPDATE_SUCCESS} from "../../src/actions";

describe('Bill saga', () => {

  describe('billUpdateSuccess()', () => {
    const generator = billUpdateSuccess();

    it('should return the state', () => {
      const next_value = generator.next().value;
      const expected = select();
      expect(next_value).to.deep.equal(expected);
    });

    // TODO: patch select() or test as suggested by redux-saga
    it.skip('should return the BILL_UPDATE_SUCCESS action', () => {
      const next_value = generator.next().value;
      const expected = put({type: BILL_UPDATE_SUCCESS, billItems: {}});
      expect(next_value).to.deep.equal(expected);
    });

    it.skip('should be finished', () => {
      expect(generator.next().done).to.equal(true);
    });
  });
});

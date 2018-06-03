import {expect} from "chai";
import {call, put} from "redux-saga/effects";
import {inventoryIndex} from "../../src/sagas/inventory";
import * as ApiInventory from "../../src/api/inventory";
import {INVENTORY_INDEX_SUCCESS} from "../../src/actions";

describe('Inventory saga', () => {

  describe('inventoryIndex()', () => {
    const generator = inventoryIndex();

    it('should return the ApiInventory.index call', () => {
      const next_value = generator.next().value;
      const expected = call(ApiInventory.index);
      expect(next_value).to.deep.equal(expected);
    });

    it('should return the INVENTORY_INDEX_SUCCESS action', () => {
      const next_value = generator.next().value;
      const expected = put({type: INVENTORY_INDEX_SUCCESS, response: undefined});
      expect(next_value).to.deep.equal(expected);
    });

    it('should be finished', () => {
      expect(generator.next().done).to.equal(true);
    });
  });
});

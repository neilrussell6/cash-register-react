import {expect} from "chai";
import {inventoryItems} from "../../src/reducers/inventory";
import {BILL_ADD_OR_UPDATE, BILL_REMOVE, INVENTORY_INDEX_SUCCESS} from "../../src/actions";

// fixtures
const inventory_response = [
  {id: 101, key: 'aaa', name: 'AAA', unitprice: 1000},
  {id: 102, key: 'bbb', name: 'BBB', unitprice: 2000},
  {id: 103, key: 'ccc', name: 'CCC', unitprice: 3000},
];

describe('inventoryItems reducer', () => {

  describe('INVENTORY_INDEX_SUCCESS', () => {

    it('should transform to object with id keys', () => {
      // given ... an empty inventory

      // when ... we inventory index was success
      const result = inventoryItems({}, {
        type: INVENTORY_INDEX_SUCCESS,
        response: inventory_response,
      });

      // then
      // ... should return object with id keys and expected values
      // ... and set active to true
      const expected = {
        '101': {name: 'AAA', unitprice: 1000, active: true},
        '102': {name: 'BBB', unitprice: 2000, active: true},
        '103': {name: 'CCC', unitprice: 3000, active: true},
      };
      expect(result).to.deep.equal(expected);
    });
  });

  describe('BILL_ADD_OR_UPDATE', () => {

    it('should deactivate inventory item when it is added to bill', () => {
      // given
      // ... an inventory state containing active items 101, 102
      const inventoryItems_state = {
        '101': {name: 'AAA', unitprice: 1000, active: true},
        '102': {name: 'BBB', unitprice: 2000, active: true},
      };

      // when ... we add or update bill with item 102
      const result = inventoryItems(inventoryItems_state, {
        type: BILL_ADD_OR_UPDATE,
        id: '102',
        data: {name: 'BBB', unitprice: 2000},
      });

      // then ... should deactivate item 102
      expect(result['102'].active).to.equal(false);
    });
  });

  describe('BILL_REMOVE', () => {

    it('should activate inventory item when it is removed from bill', () => {
      // given
      // ... a inventory state with an inactive item 101 and 102
      const inventoryItems_state = {
        '101': {name: 'AAA', unitprice: 1000, active: false},
        '102': {name: 'BBB', unitprice: 2000, active: false},
      };

      // when ... we remove bill item 102
      const result = inventoryItems(inventoryItems_state, {type: BILL_REMOVE, id: '102'});

      // then ... should reactivate item 102
      expect(result['102'].active).to.equal(true);
    });
  });
});

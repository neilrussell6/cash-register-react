import {expect} from "chai";
import {billItems, billSummary} from "../../src/reducers/bill";
import {BILL_ADD_OR_UPDATE, BILL_REMOVE, BILL_UPDATE_SUCCESS} from "../../src/actions";
import {inventoryItems} from "../../src/reducers/inventory";

describe('billItems reducer', () => {

  describe('BILL_ADD_OR_UPDATE', () => {

    it('should add bill item if it doesnt exists', () => {
      // given
      // ... a bill not containing item 102
      const billItems_state = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
      };

      // when ... we add or update bill
      const reducer = billItems[BILL_ADD_OR_UPDATE];
      console.log('-----------------------');
      const result = reducer(billItems_state, {
        type: BILL_ADD_OR_UPDATE,
        id: 102,
        data: {name: 'BBB', unitprice: 2000},
      });

      // then
      // ... should add item 102 to the bill
      // ... and set the quantity to 1
      // ... and set totalprice to unitprice
      const expected = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 1, totalprice: 2000},
      };
      expect(result).to.deep.equal(expected);
    });

    it('should update bill item if it exists', () => {
      // given
      // ... a bill state containing item 102
      const billItems_state = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 2, totalprice: 4000},
      };

      // when ... we add or update bill
      const reducer = billItems[BILL_ADD_OR_UPDATE];
      const result = reducer(billItems_state, {
        type: BILL_ADD_OR_UPDATE,
        id: 102,
        data: {id: 102, name: 'BBB', unitprice: 2000},
      });

      // then
      // ... should update the quantity of item 102
      // ... and recalculate the totalprice
      const expected = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 3, totalprice: 6000},
      };
      expect(result).to.deep.equal(expected);
    });

    it('should update bill item with quantity if provided', () => {
      // given
      // ... a bill state containing item 102
      const billItems_state = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 2, totalprice: 4000},
      };

      // when ... we add or update bill
      const reducer = billItems[BILL_ADD_OR_UPDATE];
      const result = reducer(billItems_state, {
        type: BILL_ADD_OR_UPDATE,
        id: 102,
        data: {id: 102, name: 'BBB', unitprice: 2000},
        quantity: 2,
      });

      // then
      // ... should update the quantity of item 102
      const expected = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 4, totalprice: 8000},
      };
      expect(result).to.deep.equal(expected);
    });

    // TODO: parametrize with previous test
    it('should update bill item with negative quantity if provided', () => {
      // given
      // ... a bill state containing item 102
      const billItems_state = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 2, totalprice: 4000},
      };

      // when ... we add or update bill
      const reducer = billItems[BILL_ADD_OR_UPDATE];
      const result = reducer(billItems_state, {
        type: BILL_ADD_OR_UPDATE,
        id: 102,
        data: {id: 102, name: 'BBB', unitprice: 2000},
        quantity: -1,
      });

      // then
      // ... should update the quantity of item 102
      const expected = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 1, totalprice: 2000},
      };
      expect(result).to.deep.equal(expected);
    });

    // TODO: parametrize with previous test
    it('should not update bill item quantity lower than one', () => {
      // given
      // ... a bill state containing item 102
      const billItems_state = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 3, totalprice: 6000},
      };

      // when ... we add or update bill
      const reducer = billItems[BILL_ADD_OR_UPDATE];
      const result = reducer(billItems_state, {
        type: BILL_ADD_OR_UPDATE,
        id: 102,
        data: {id: 102, name: 'BBB', unitprice: 2000},
        quantity: -4,
      });

      // then
      // ... should update the quantity of item 102
      const expected = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 1, totalprice: 2000},
      };
      expect(result).to.deep.equal(expected);
    });
  });

  describe('BILL_REMOVE', () => {

    it('should remove bill item from bill', () => {
      // given
      // ... a bill state containing item 102
      const billItems_state = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '102': {name: 'BBB', unitprice: 2000, quantity: 2, totalprice: 4000},
        '103': {name: 'CCC', unitprice: 3000, quantity: 1, totalprice: 3000},
      };

      // when ... we remove bill item 102
      const reducer = billItems[BILL_REMOVE];
      const result = reducer(billItems_state, {type: BILL_REMOVE, id: '102'});

      // then ... should remove it from the bill
      const expected = {
        '101': {name: 'AAA', unitprice: 1000, quantity: 5, totalprice: 5000},
        '103': {name: 'CCC', unitprice: 3000, quantity: 1, totalprice: 3000},
      };
      expect(result).to.deep.equal(expected);
    });
  });
});

describe('billSummary reducer', () => {

  describe('ADD_OR_UPDATE_BILL', () => {

    it('should recalculate bill summary', () => {
        // given
        // ... an empty bill summary state containing item 102
        const billSummary_state = {total: 0};

        // when ... we add or update bill
        const reducer = billSummary[BILL_UPDATE_SUCCESS];
        const result = reducer(billSummary_state, {
          type: BILL_UPDATE_SUCCESS,
          billItems: {
            aaa: {totalprice: 2000},
            bbb: {totalprice: 4000},
          },
        });

        // then ... should recalculate bill summary
        const expected = {
          total: 6000
        };
        expect(result).to.deep.equal(expected);
      });
  });
});

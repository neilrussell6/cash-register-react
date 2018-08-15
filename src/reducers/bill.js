import * as R from "ramda";
import {mergeAt} from "../objectUtils";
import {BILL_ADD_OR_UPDATE, BILL_REMOVE, BILL_UPDATE_SUCCESS} from "../actions";

export const BILL_SUMMARY_DEFAULT_STATE = {total: 0};

function calculateQuantity(quantity, adjustment) {
  const result = quantity + adjustment;
  return result > 0 ? result : 1;
}

function addOrUpdateBill(state, action) {
  const k = R.toString(action.id);

  // quantity : current + adjustment
  const current_quantity = R.pathOr(0, [k, 'quantity'], state);
  const quantity_adjustment = R.propOr(1, 'quantity', action);
  const quantity = calculateQuantity(current_quantity, quantity_adjustment);

  // unitprice : from state (if updating) OR from action.data (if adding)
  const unitprice = R.propOr(R.path([k, 'unitprice'], state), 'unitprice', action.data);

  const totalprice = quantity * unitprice;
  const data = {
    ...R.pick(['name', 'unitprice'], action.data),
    quantity,
    totalprice,
  };
  return mergeAt(k, data, state);
}

function removeFromBill(state, action) {
  return R.dissoc(action.id, state);
}

function updateTotalPrice(state, action) {
  const totalprices = R.values(R.pluck('totalprice', action.billItems));
  return {
    total: R.sum(totalprices),
  };
}

export const billItems = {
  [BILL_ADD_OR_UPDATE]: addOrUpdateBill,
  [BILL_REMOVE]: removeFromBill,
};

export const billSummary = {
  [BILL_UPDATE_SUCCESS]: updateTotalPrice,
};


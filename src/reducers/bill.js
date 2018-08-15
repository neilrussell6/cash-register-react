import * as R from "ramda";
import {mergeAt} from "../objectUtils";
import {BILL_ADD_OR_UPDATE, BILL_REMOVE, BILL_UPDATE_SUCCESS} from "../actions";

export const BILL_SUMMARY_DEFAULT_STATE = {total: 0};

function addOrUpdateBill(state, action) {
  const k = R.toString(action.id);
  const item = {
    ...R.pick(['name', 'unitprice'], action.data),
    quantity: 1,
    totalprice: action.data.unitprice,
  };

  // update
  if (R.has(k, state)) {
    const action_quantity = R.propOr(1, 'quantity', action);
    const action_quantity_change = state[k].quantity + action_quantity;
    const quantity = action_quantity_change > 1 ? action_quantity_change : 1;
    const totalprice = state[k].unitprice * quantity;
    const data = {...item, quantity, totalprice};
    console.log(item);
    console.log(data);
    return mergeAt(k, data, state);
  }

  // add
  return mergeAt(k, item, state);
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


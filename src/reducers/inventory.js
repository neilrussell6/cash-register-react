import * as R from "ramda";
import {mergeAt} from "../objectUtils";
import {BILL_ADD_OR_UPDATE, BILL_REMOVE, INVENTORY_INDEX_SUCCESS} from "../actions";

const deactivateById = (state, action) => mergeAt(action.id, {active: false}, state);

const activateById = (state, action) => mergeAt(action.id, {active: true}, state);

const buildInventory = (state, action) => {
  return action.response.reduce((acc, x) => {
    return {
      ...acc,
      [x.id]: {...R.pick(['name', 'unitprice'], x), active: true},
    };
  }, {})
};

export const inventoryItems = {
  [BILL_ADD_OR_UPDATE]: deactivateById,
  [BILL_REMOVE]: activateById,
  [INVENTORY_INDEX_SUCCESS]: buildInventory,
};

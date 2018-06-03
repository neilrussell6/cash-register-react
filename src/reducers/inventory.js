import {BILL_ADD_OR_UPDATE, BILL_REMOVE, INVENTORY_INDEX_SUCCESS} from "../actions";

function _build_inventory_item({name, unitprice}) {
  return {name, unitprice, active: true};
}

export function inventoryItems(state = {}, action) {
  switch (action.type) {
    case BILL_ADD_OR_UPDATE:
      return {
        ...state,
        [action.id]: {...state[action.id], active: false},
      };

    case BILL_REMOVE:
      return {
        ...state,
        [action.id]: {...state[action.id], active: true},
      };

    case INVENTORY_INDEX_SUCCESS:
      return action.response.reduce((acc, x) => ({
        ...acc,
        [x.id]: _build_inventory_item(x),
      }), {});

    default:
      return state;
  }
}

import {BILL_ADD_OR_UPDATE, BILL_REMOVE, BILL_UPDATE_SUCCESS} from "../actions";

function _build_bill_item({name, unitprice}) {
  return {name, unitprice, quantity: 1, totalprice: unitprice};
}

function _calculate_bill_item_total_price(unitprice, quantity) {
  return unitprice * quantity;
}

function _calculate_bill_total_price(billItems) {
  return Object.keys(billItems).reduce((acc, k) => acc + billItems[k].totalprice, 0);
}

export function billItems(state = {}, action) {
  switch (action.type) {
    case BILL_ADD_OR_UPDATE:
      const k = action.id.toString();
      const item = _build_bill_item(action.data);

      // update
      if (state.hasOwnProperty(k)) {
        const action_quantity = action.hasOwnProperty('quantity') ? action.quantity : 1;
        const action_quantity_change = state[k].quantity + action_quantity;
        const quantity = action_quantity_change > 1 ? action_quantity_change : 1;
        const totalprice = _calculate_bill_item_total_price(state[k].unitprice, quantity);
        return {
          ...state,
          ...{[k]: {
              ...item,
              quantity,
              totalprice,
          }},
        };
      }

      // add
      return {...state, ...{[k]: item}};

    case BILL_REMOVE:
      return Object.keys(state)
        .filter(k => k !== action.id)
        .reduce((acc, k) => ({...acc, [k]: state[k]}), {});

    default:
      return state;
  }
}

export function billSummary(state = {total: 0}, action) {
  switch (action.type) {
    case BILL_UPDATE_SUCCESS:
      return {
        total: _calculate_bill_total_price(action.billItems),
      };

    default:
      return state;
  }
}

import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import {reducer as form} from "redux-form";
import {inventoryItems} from "./inventory";
import {billItems, billSummary, BILL_SUMMARY_DEFAULT_STATE} from "./bill";
import {keypad, KEYPAD_DEFAULT_STATE} from "./keypad";
import {endpoint} from "../storeUtils";

export const reducers = combineReducers({
  routing,
  form,
  inventoryItems: endpoint(inventoryItems, {}),
  billItems: endpoint(billItems, {}),
  billSummary: endpoint(billSummary, BILL_SUMMARY_DEFAULT_STATE),
  keypad: endpoint(keypad, KEYPAD_DEFAULT_STATE),
});

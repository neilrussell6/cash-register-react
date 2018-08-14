import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import {reducer as form} from "redux-form";
import {inventoryItems} from "./inventory";
import {billItems, billSummary} from "./bill";
import {keypad} from "./keypad";

export const reducers = combineReducers({
  routing,
  form,
  inventoryItems,
  billItems,
  billSummary,
  keypad,
});

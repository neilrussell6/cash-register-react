import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import {inventoryItems} from "./inventory";
import {billItems, billSummary} from "./bill";
import {keypad} from "./keypad";

export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  inventoryItems,
  billItems,
  billSummary,
  keypad,
});

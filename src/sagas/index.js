import {all, fork, takeLatest} from "redux-saga/effects";
import {inventoryIndex} from "./inventory";
import {billUpdateSuccess} from "./bill";
import {BILL_ADD_OR_UPDATE, BILL_REMOVE, INVENTORY_INDEX} from "../actions";

export function* sagas() {
  yield all([
    fork(takeLatest, INVENTORY_INDEX, inventoryIndex),
    fork(takeLatest, BILL_ADD_OR_UPDATE, billUpdateSuccess),
    fork(takeLatest, BILL_REMOVE, billUpdateSuccess),
  ]);
}

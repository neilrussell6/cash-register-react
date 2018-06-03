import {call, put} from "redux-saga/effects";
import {INVENTORY_INDEX_SUCCESS, INVENTORY_INDEX_FAILURE} from "../actions";
import * as ApiInventory from "../api/inventory";

export function* inventoryIndex() {
  try {
    const response = yield call(ApiInventory.index);
    yield put({type: INVENTORY_INDEX_SUCCESS, response});
  } catch (error) {
    yield put({type: INVENTORY_INDEX_FAILURE, error});
  }
}

import {put, select} from "redux-saga/effects";
import {BILL_UPDATE_SUCCESS} from "../actions";

export function* billUpdateSuccess() {
  const state = yield select();
  yield put({type: BILL_UPDATE_SUCCESS, billItems: state.billItems});
}

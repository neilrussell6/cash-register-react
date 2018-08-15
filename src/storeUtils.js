import * as R from "ramda";

export const endpoint = (reducers, default_state = null) => (state, action) => {
  const _state = state == null ? default_state : state;
  return R.has(action.type, reducers)
    ? reducers[action.type](_state, action)
    : _state;
};

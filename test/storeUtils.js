import {assert} from "chai";
import * as sinon from "sinon";
import {endpoint} from "../src/storeUtils";

describe('endpoint', () => {

  // TODO: parametrize
  it('should call reducer by action.type', () => {
    const reducer1 = sinon.fake();
    const reducer2 = sinon.fake();

    // given ... an endpoint that responds to 2 actions with separate reducers
    const reducers = {
      'ACTION1': reducer1,
      'ACTION2': reducer2,
    };
    const _endpoint = endpoint(reducers);

    // when ... we call the endpoint with a state and a supported action
    const state = {'SOME': 'STATE'};
    const action = {type: 'ACTION1', value: 'abc'};
    _endpoint(state, action);

    // then ... should have called the expected reducer
    assert(reducer1.calledWith(state, action));
  });
});

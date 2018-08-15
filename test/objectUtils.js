import {expect} from "chai";
import {mergeAt} from "../src/objectUtils";

describe('mergeAt', () => {
  it('should update value of specific object property', () => {
    // when ... we update the 'a' property of this object
    const obj = {
      a: {name: 'A', number: 1},
      b: {name: 'B', number: 2},
    };
    const result = mergeAt('a', {number: 6, active: true}, obj);

    // then ... should have updated 'a' property, retaining any of it's existing properties
    const expected = {
      a: {name: 'A', number: 6, active: true},
      b: {name: 'B', number: 2},
    };
    expect(result).to.deep.equal(expected);
  });
});

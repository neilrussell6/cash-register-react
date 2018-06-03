import {expect} from "chai";
import React from "react";
import {shallow} from "enzyme";
import {App} from "../../src/components/App";

describe('App component', () => {

  describe('render()', () => {

    it('should render the component', () => {
      const props = {};
      const wrapper = shallow(<App {...props}/>);
      expect(wrapper.length).to.equal(1);
    });
  });
});

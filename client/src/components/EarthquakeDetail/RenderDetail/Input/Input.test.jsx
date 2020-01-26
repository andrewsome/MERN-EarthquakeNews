import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

describe('<Input />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Input />);
  });

  it('should contain an StyledInput', () => {
      expect(wrapper.find('input')).toHaveProperty('onChange', wrapper.instance().onChange);
  });

});

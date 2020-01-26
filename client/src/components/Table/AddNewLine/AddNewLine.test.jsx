import React from 'react';
import { shallow } from 'enzyme';
import AddNewLine, { StyledForm } from './AddNewLine';

describe('<AddNewLine />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<AddNewLine />));
  });

  it('renders StyledForm', () => {
    expect(wrapper.find(StyledForm).props()).toHaveProperty('SendData', wrapper.instance().onSubmit);
  });

  it('renders Input', () => {
    expect(wrapper.find('Input').length).toBe(6)
  });
});
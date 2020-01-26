import React from 'react';
import { shallow } from 'enzyme';
import DetailSearchBar from './DetailSearchBar';

describe('<DetailSearchBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<DetailSearchBar />));
  });

  it('renders form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders label', () => {
    expect(wrapper.find('label').length).toBe(1);
  });

  it('renders input', () => {
    expect(wrapper.find('input').length).toBe(1);
  });

  it('renders text', () => {
    expect(wrapper.text()).toBe('Earthquake ID:Retrieve');
  });
});
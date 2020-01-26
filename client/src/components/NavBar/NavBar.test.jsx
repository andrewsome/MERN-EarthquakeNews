import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

describe('<NavBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<NavBar />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 1 ul', () => {
    expect(wrapper.find('ul').length).toBe(1);
  });

  it('renders 3 li', () => {
    expect(wrapper.find('li').length).toBe(3);
  });

  it('renders text', () => {
    expect(wrapper.text()).toBe('Top 10Earthquake DetailRetrieve Latest');
  });

});
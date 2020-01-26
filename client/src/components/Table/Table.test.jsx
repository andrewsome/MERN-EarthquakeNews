import React from 'react';
import { shallow } from 'enzyme';
import Table from './Table';

describe('<Table />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<Table data={true} />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders AddNewLine', () => {
    expect(wrapper.find('table').length).toBe(1);
  });
});
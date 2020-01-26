import React from 'react';
import { shallow } from 'enzyme';
import RenderDetail from './RenderDetail';

describe('<RenderDetail />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<RenderDetail data={false} />));
  });

  it('renders text', () => {
    expect(wrapper.text()).toBe('Please enter an earthquake ID');
  });

});
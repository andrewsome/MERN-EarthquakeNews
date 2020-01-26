import React from 'react';
import { shallow } from 'enzyme';
import Header, { Container } from './Header';

describe('<Header />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<Header />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render <Container />', () => {
    expect(wrapper.find(Container).exists()).toBe(true);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
        <Header>
            lalala
        </Header>
    ));
    expect(wrapper.contains('lalala')).toBe(true);
});

});
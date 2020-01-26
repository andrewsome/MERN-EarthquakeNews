import React from 'react';
import { shallow } from 'enzyme';
import Wrapper, { Container } from './Wrapper';

describe('<Wrapper />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<Wrapper />));
  });

  it('renders children when passed in', () => {
      const wrapper = shallow((
          <Container>
              lalala
          </Container>
      ));
      expect(wrapper.contains('lalala')).toBe(true);
  });
});
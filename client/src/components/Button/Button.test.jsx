import React from 'react';
import { shallow } from 'enzyme';
import StyledButton from './Button'

describe('<StyledButton />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <StyledButton>Submit</StyledButton>
    ));
  });

  it('renders children when passed in', () => {
    expect(wrapper.contains('Submit')).toBe(true);
  });
});

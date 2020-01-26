import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

describe('<Main />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<Main requiredDatas={true} />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders <Table>', () => {
    expect(wrapper.find('Table').exists()).toBeFalsy();
  });

});
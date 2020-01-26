import React from 'react';
import { shallow } from 'enzyme';
import LatestNews from './LatestNews';
import Table from '../Table';

describe('<LatestNews />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<LatestNews />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders <form>', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders <p>', () => {
    expect(wrapper.text()).toBe('Retrieve the latest 100 earthquakes and saves them into the DatabaseRetrieve');
  });

  it('renders <Table>', () => {
    expect(wrapper.find('Table').exists()).toBeFalsy();
  });

});

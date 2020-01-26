import React from 'react';
import { shallow } from 'enzyme';
import RenderDetail from './RenderDetail';

describe('<RenderDetail />', () => {
  let wrapper;

  const temporaryData = {
    tempPlace: '',
    tempMag: '',
    tempLat: '',
    tempLon: '',
  }

  beforeEach(() => {
    wrapper = shallow((<RenderDetail data={true} temporaryData={temporaryData} editEnabled={true} />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders <p>', () => {
    expect(wrapper.find('p').length).toBe(6);
  });

  it('renders <Input>', () => {
    expect(wrapper.find('Input').length).toBe(4);
  });

});
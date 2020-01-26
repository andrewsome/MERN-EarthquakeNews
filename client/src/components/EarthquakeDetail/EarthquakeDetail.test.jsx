import React from 'react';
import { shallow } from 'enzyme';
import EarthquakeDetail from './EarthquakeDetail';

describe('<EarthquakeDetail />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<EarthquakeDetail />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('<DetailSearchBar />', () => {
    let detailSearchBar;

    beforeEach(() => {
      detailSearchBar = wrapper.find('DetailSearchBar');
    });

    describe('props', () => {
      let props;

      beforeEach(() => {
        props = detailSearchBar.props();
      });

      it('passes earthquakeId', () => {
        expect(props).toHaveProperty('earthquakeId', wrapper.state().earthquakeId);
      });
  
      it('passes handleSubmit', () => {
        expect(props).toHaveProperty('handleSubmit', wrapper.instance().handleSubmit);
      });

      it('passes handleInputId', () => {
        expect(props).toHaveProperty('handleInputId', wrapper.instance().handleInputId);
      });
    });
  });

  describe('<RenderDetail />', () => {
    let renderDetail;

    beforeEach(() => {
      renderDetail = wrapper.find('RenderDetail');
    });

    describe('props', () => {
      let props;

      beforeEach(() => {
        props = renderDetail.props();
      });

      it('passes data', () => {
        expect(props).toHaveProperty('data', wrapper.state().data);
      });
  
      it('passes editEnabled', () => {
        expect(props).toHaveProperty('editEnabled', wrapper.state().editEnabled);
      });

      it('passes temporaryData', () => {
        expect(props).toHaveProperty('temporaryData', wrapper.state().temporaryData);
      });

      it('passes handleTempInputData', () => {
        expect(props).toHaveProperty('handleTempInputData', wrapper.instance().handleTempInputData);
      });

      it('passes handleEdit', () => {
        expect(props).toHaveProperty('handleEdit', wrapper.instance().handleEdit);
      });

      it('passes handleSave', () => {
        expect(props).toHaveProperty('handleSave', wrapper.instance().handleSave);
      });
    });
  });
});
import React from 'react';
import Table from '../Table';
import moment from 'moment';
import './Main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredDatas: '',
    }
  }

  async componentDidMount() {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson');
    const data = await response.json();
    const currentDate = data.metadata.generated;
    const lastDate = moment(currentDate).subtract(24, "hours");
    const filtedData = [];
    data.features.filter(feature => {
      const { properties } = feature;
      const { time } = properties;
      if (moment(time).isBetween(lastDate, currentDate)) {
        return filtedData.push(feature);
      }
      return null;
    });
    const requiredDatas = filtedData.sort(this.compare).slice(0, 10);
    this.setState({
      requiredDatas
    })
  };

  compare = (a, b) => {
    if (a.properties.mag < b.properties.mag) {
      return 1;
    }
    if (a.properties.mag > b.properties.mag) {
      return -1;
    }
    return 0;
  };

  render() {
    const { requiredDatas } = this.state;
    return (
      <div className='Main'>
        {!requiredDatas ? '' : <Table requiredDatas={requiredDatas} />}
      </div>
    );
  };
};

export default Main;

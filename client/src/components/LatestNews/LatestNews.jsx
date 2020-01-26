import React, { Component } from 'react';
import './LatestNews.scss';
import Table from '../Table';
import Button from '../Button';

export default class LatestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredDatas: '',
    }
  }
  handleLatestData = async (event) => {
    event.preventDefault();
    const fetchResponse = await fetch('http://localhost:4000/api/save');
    const fetchData = await fetchResponse.json();
    this.setState({
      requiredDatas: fetchData,
    });
  }

  render() {
    const { requiredDatas } = this.state;
    return (
      <div className="Latest">
        {
          !requiredDatas ? 
          <form 
            className="Latest__info" 
            onSubmit={event => this.handleLatestData(event)}
          >
            <p>Retrieve the latest 100 earthquakes and saves them into the Database</p>
            <Button type="submit">Retrieve</Button>
          </form> : 
          <Table 
            requiredDatas={requiredDatas} 
          />
        }
      </div>
    )
  }
}

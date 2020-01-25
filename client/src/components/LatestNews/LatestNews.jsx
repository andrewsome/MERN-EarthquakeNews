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

  renderForm = () => {
    return (
      <form className="Latest__info" onClick={event => this.handleLatestData(event)}>
        <p>Retrieve the latest 100 earthquakes and saves them into the Database</p>
        <Button type="submit">Retrieve</Button>
      </form>
    )
  }

  renderTable = () => {
    const { requiredDatas } = this.state;
    return (
      <div>
        {!requiredDatas ? '' : <Table requiredDatas={requiredDatas} />}
      </div>
    )
  }

  render() {
    return (
      <div className="Latest">
        {!this.state.requiredDatas ? this.renderForm() : this.renderTable()}
      </div>
    )
  }
}

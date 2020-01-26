import React, { Component } from 'react';
import './EarthquakeDetail.scss';
import DetailSearchBar from './DetailSearchBar';
import RenderDetail from './RenderDetail';

export default class EarthquakeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthquakeId: '',
      data: '',
      editEnabled: false,
      temporaryData: {
        tempId: '',
        tempMag: '',
        tempPlace: '',
        tempTime: '',
        tempUrl: '',
        tempLat: '',
        tempLon: '',
      }
    }
  }

  handleSubmit = async (event, id) => {
    event.preventDefault();
    if (id) {
      try {
        const response = await fetch(`http://localhost:4000/api/getdetail/${id}`);
        const data = await response.json();
        this.setState({
          data: data[0],
          temporaryData: {
            tempId: data.id,
            tempMag: data.mag,
            tempPlace: data.place,
            tempTime: data.time,
            tempUrl: data.url,
            tempLat: data.lat,
            tempLon: data.lon,
          }
        });
      } catch {
        return alert('Please enter a valid ID')
      }
    }
    else {
      return alert('ID field can\'t be empty');
    }
  }

  handleInputId = (event) => {
    const { target: { value } } = event;
    this.setState({
      earthquakeId: value,
    });
  }

  handleTempInputData = (event) => {
    const { target: { name, value } } = event;
    this.setState(prevState => {
      return {
        temporaryData: {
          ...prevState.temporaryData,
          [name]: value,
          tempId: this.state.data.id,
          tempTime: this.state.data.time,
          tempUrl: this.state.data.url
        }
      }
    })
  }
  handleEdit = () => {
    this.setState({
      editEnabled: true,
    })
  }

  handleSave = () => {
    const { temporaryData, data } = this.state;
    const { id, time, url } = data;
    const { tempPlace, tempMag, tempLat, tempLon } = temporaryData;
    if (!tempPlace || !tempMag || !tempLat || !tempLon) {
      alert('One of the fields is empty');
    } else {
      this.setState({
        data: {
          id: id,
          mag: tempMag,
          place: tempPlace,
          time: time,
          url: url,
          lat: tempLat,
          lon: tempLon
        },
        editEnabled: false,
      });
      this.sendingUpdate();
    }
  }

  sendingUpdate = async () => {
    const { temporaryData } = this.state;
    const { tempId } = temporaryData;
    const setting = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(temporaryData),
    }
    const response = await fetch(`http://localhost:4000/api/updatedetail/${tempId}`, setting);
    const json = await response.json();
    console.log(json)
  }

  render() {
    const { earthquakeId, editEnabled, data, temporaryData } = this.state;
    return (
      <div className="EarthquakeDetail">
        <DetailSearchBar 
          earthquakeId={earthquakeId} 
          handleSubmit={this.handleSubmit} 
          handleInputId={this.handleInputId}
        />
        <RenderDetail 
          data={data} 
          editEnabled={editEnabled} 
          temporaryData={temporaryData} 
          handleTempInputData={this.handleTempInputData}
          handleEdit={this.handleEdit}
          handleSave={this.handleSave} 
        />
      </div>
    )
  }
}

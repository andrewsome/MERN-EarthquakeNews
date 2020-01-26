import React, { Component } from 'react';
import './EarthquakeDetail.scss';
import DetailSearchBar from './DetailSearchBar';
import RenderDetail from './RenderDetail';
import { validator } from '../Input';

export default class EarthquakeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthquakeId: '',
      data: '',
      editEnabled: false,
    }
  }

  handleSubmit = async (event, id) => {
    event.preventDefault();
    if (id) {
      try {
        const response = await fetch(`http://localhost:4000/api/getdetail/${id}`);
        const data = await response.json();
        this.setState({
          data: {
            id: {
              label: 'ID',
              value: data[0].id,
              validations: [{
                validator: validator.isNotEmpty,
                message: 'Can not be empty',
              }]
            },
            mag: {
              label: 'Magnitude',
              value: data[0].mag,
              validations: [{
                validator: validator.isNotEmpty,
                message: 'Can not be empty',
              },
              {
                validator: validator.isNumber,
                message: 'Number please'
              }]
            },
            place: {
              label: 'Place',
              value: data[0].place,
              validations: [{
                validator: validator.isNotEmpty,
                message: 'Can not be empty',
              }]
            },
            time: {
              label: 'Time',
              value: data[0].time,
            },
            url: {
              label: 'Mroe Info',
              value: data[0].url,
              validations: [{
                validator: validator.isNotEmpty,
                message: 'Can not be empty',
              },
              {
                validator: validator.isUrl,
                message: 'please enter a valid url',
              }]
            },
            lat: {
              label: 'Latitude',
              value: data[0].lat,
              validations: [{
                validator: validator.isNotEmpty,
                message: 'Can not be empty',
              },
              {
                validator: validator.isNumber,
                message: 'Number please'
              }]
            },
            lon: {
              label: 'Lontidude',
              value: data[0].lon,
              validations: [{
                validator: validator.isNotEmpty,
                message: 'Can not be empty',
              },
              {
                validator: validator.isNumber,
                message: 'Number please'
              }]
            }
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

  handleTempInputData = (event, key) => {
    const { target: { value } } = event;
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            value,
          }
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
    this.setState({
      editEnabled: false
    })
    this.sendingUpdate(this.state.data);
  }

  sendingUpdate = async (data) => {
    const { id, mag, place, time, url, lat, lon } = data;
    const body = {
      id: id.value,
      mag: mag.value,
      place: place.value,
      time: time.value,
      url: url.value,
      lat: lat.value,
      lon: lon.value
    }
    const setting = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }
    const response = await fetch(`http://localhost:4000/api/updatedetail/${id.value}`, setting);
    const json = await response.json();
    console.log(json)
  }

  render() {
    const { earthquakeId, editEnabled, data } = this.state;
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
          handleTempInputData={this.handleTempInputData}
          handleEdit={this.handleEdit}
          handleSave={this.handleSave} 
        />
      </div>
    )
  }
}

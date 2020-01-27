import React, { Component } from 'react';
import Button from '../../Button';
import Input, { validator } from '../../Input';
import moment from 'moment';

export default class AddNewLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        id: {
          label: 'ID',
          value: '',
          validations: [{
            validator: validator.isNotEmpty,
            message: 'Can not be empty',
          }]
        },
        mag: {
          label: 'Magnitude',
          value: '',
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
          value: '',
          validations: [{
            validator: validator.isNotEmpty,
            message: 'Can not be empty',
          }]
        },
        time: {
          label: 'Time',
          value: 'now',
        },
        url: {
          label: 'More Info',
          value: '',
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
          value: '',
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
          value: '',
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
    }
  }

  handleInput = (event, key) => {
    const { target: { value } } = event;
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            value,
          },
        }
      }
    })
  }

  SendData = async (event, data) => {
    event.preventDefault();
    const { id, mag, place, url, lat, lon } = data;
    const body = {
      id: id.value,
      mag: mag.value,
      place: place.value,
      time: moment().format('LLLL'),
      url: url.value,
      lat: lat.value,
      lon: lon.value
    }
    const setting = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }
    const response = await fetch(`http://localhost:4000/api/addnew`, setting);
    const json = await response.json();
    console.log(json)
  }

  render() {
    const { data } = this.state;
    return (
      <>
      <h4>Add Earthquake New out of system</h4>
      <form className="__AddNewForm" onSubmit={(event) => this.SendData(event, data)}>
        {Object.keys(data).map(key => {
          const { label, value, validations } = data[key];
          if (label === 'Time') {
            return (
              <div key={label} className='__InputFieldBlock'>
                <label className='__InputFieldLabel' >
                  {label}: 
                </label>
                <span className='__TimeRow'>now</span> 
              </div>
            )
          }
          return (
            <div key={label} className='__InputFieldBlock'>
              <label className='__InputFieldLabel'>
                {label}: 
              </label>
              <span className='__InputField'>
              <Input 
                className='__InputField'
                type="text" 
                placeholder={label}
                value={value}
                validations={validations}
                onChange={(event) => this.handleInput(event, key)}/>
              </span>
            </div>
          )
        })}
        <Button type="submit" 
        disabled={
          !data.id.value  ||
          !data.url.value ||
          !data.place.value ||
          !data.time.value  ||
          !data.lat.value ||
          !data.lon.value ||
          !data.mag.value
          }>Submit</Button>
      </form>
      </>
    )
  }
}

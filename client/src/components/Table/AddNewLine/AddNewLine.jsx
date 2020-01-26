import React, { Component } from 'react';
import Button from '../../Button';
import styled from 'styled-components';
import Input, { validator } from '../Input';
import moment from 'moment';

export const StyledForm = styled.form`
  display: flex;
  background: white;
  padding: 1rem;
  margin: 1rem;
`;

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
          label: 'Mroe Info',
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
      time: moment().format(),
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
      <StyledForm onSubmit={(event) => this.SendData(event, data)}>
        {Object.keys(data).map(key => {
          const { label, value, validations } = data[key];
          if (label === 'Time') {
            return (
              <div key={label}>
                {label}: now &nbsp;
              </div>
            )
          }
          return (
            <div key={label}>
              {label}: 
              <Input 
                type="text" 
                placeholder={label}
                value={value}
                validations={validations}
                onChange={(event) => this.handleInput(event, key)}/>
              &nbsp;
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
      </StyledForm>
    )
  }
}

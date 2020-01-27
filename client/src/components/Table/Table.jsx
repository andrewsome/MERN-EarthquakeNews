import React, { Component } from 'react';
import moment from 'moment';
import './Table.scss';
import AddNewLine from './AddNewLine';
import Input, { validator } from '../Input';
import Button from '../Button';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: '',
    }
  }

  componentDidMount() {
    let data = {}
    this.props.requiredDatas.forEach((item, index) => {
      data[index] = {
        data: {
          id: {
            label: 'ID',
            value: item.id,
            validations: [{
              validator: validator.isNotEmpty,
              message: 'Can not be empty',
            }]
          },
          mag: {
            label: 'Magnitude',
            value: item.properties.mag,
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
            value: item.properties.place,
            validations: [{
              validator: validator.isNotEmpty,
              message: 'Can not be empty',
            }]
          },
          time: {
            label: 'Time',
            value: item.properties.time,
            validations: [{
              validator: validator.isNotEmpty,
              message: 'Can not be empty',
            }]
          },
          url: {
            label: 'Mroe Info',
            value: item.properties.url,
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
            value: item.geometry.coordinates[0],
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
            value: item.geometry.coordinates[1],
            validations: [{
              validator: validator.isNotEmpty,
              message: 'Can not be empty',
            },
            {
              validator: validator.isNumber,
              message: 'Number please'
            }]
          },
        },
        editEnabled: false
      }
    });
    this.setState({
      originalData: data
    });
  }

  handleInput = (event, key, subKey) => {
    const { target: { value } } = event;
    this.setState(prevState => {
      return {
        originalData: {
          ...prevState.originalData,
          [key]: {
            ...prevState.originalData[key],
            data: {
              ...prevState.originalData[key].data,
              [subKey]: {
                ...prevState.originalData[key].data[subKey],
                value
              }
            }
          }
        }
      }
    });
  }

  handleEdit = (event, key) => {
    this.setState(prevState => {
      return {
        originalData: {
          ...prevState.originalData,
          [key]: {
            ...prevState.originalData[key],
            editEnabled: true,
          }
        }
      }
    })
  }

  handleSave = (event, key) => {
    this.setState(prevState => {
      return {
        originalData: {
          ...prevState.originalData,
          [key]: {
            ...prevState.originalData[key],
            editEnabled: false,
          }
        }
      }
    });
    this.sendingData(this.state.originalData[key])
  }

  sendingData = async (originalData) => {
    const { data } = originalData;
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
    const response = await fetch(`http://localhost:4000/api/getdetail/${id.value}`);
    const json = await response.json();
    if (json) {
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
    } else {
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
  }

  render() {
    const { originalData } = this.state;
    return (
      <div className="Table">
        <AddNewLine />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Magnitude</th>
              <th>Place</th>
              <th>Time</th>
              <th>More info</th>
              <th>Latitude</th>
              <th>Longtitude</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(originalData).map(key => {
              const { data, editEnabled } = originalData[key];
              return (
                <tr key={key}>
                  {Object.keys(data).map(subKey => {
                    const { label, value, validations } = data[subKey];
                    if (subKey === 'id') {
                      return (
                        <td key={subKey}>
                          {value}
                        </td>
                      )
                    }
                    if (subKey === 'time') {
                      return (
                        <td key={subKey}>
                          {moment(value).format()}
                        </td>
                      )
                    }
                    if (subKey === 'url') {
                      return (
                        <td key={subKey}>
                          <a href={value}>click here</a>
                        </td>
                      )
                    }
                    return (
                      <td key={subKey}>
                        {
                          !editEnabled ?
                            <>{value}</> :
                            <>
                              <Input
                                type="text"
                                value={value}
                                validations={validations}
                                placeholder={label}
                                onChange={(event) => this.handleInput(event, key, subKey)} />
                            </>
                        }
                      </td>
                    )
                  })}
                  <td>
                    {
                      !editEnabled ?
                        <Button
                          onClick={(event) => this.handleEdit(event, key)}
                        >Edit</Button> :
                        <Button
                          disabled={
                            !originalData[key].data.mag.value ||
                            !originalData[key].data.place.value ||
                            !originalData[key].data.lat.value ||
                            !originalData[key].data.lon.value 
                          }
                          onClick={(event) => this.handleSave(event, key)}
                        >Save</Button>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };
};

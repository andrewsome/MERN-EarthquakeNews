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
      data: '',
    }
  }

  componentDidMount() {
    let data = {}
    this.props.requiredDatas.forEach((item, index) => {
      data[index] = {
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
        editEnabled: {
          value: item.properties.time,
          condition: false,
          validations: [{
            validator: validator.isNotEmpty,
            message: 'Can not be empty',
          }]
        }
      }
    });
    this.setState({
      data
    });
  }

  handleInput = (event, key, subKey) => {
    const { target: { name, value } } = event;
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            [subKey]: {
              ...prevState.data[subKey],
              [name]: value,
            }
          }
        }
      }
    });
  }

  handleEdit = (event, key, subKey) => {
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            editEnabled: {
              ...prevState.data[key].editEnabled,
              condition: true,
            }
          }
        }
      }
    })
  }

  handleSave = (event, key, subKey) => {
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            editEnabled: {
              ...prevState.data[key].editEnabled,
              condition: false,
            }
          }
        }
      }
    });
    this.sendingData(this.state.data[key])
  }

  sendingData = async (data) => {
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
    const response = await fetch(`http://localhost:4000/api/getdetail/${id}`);
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
      const response = await fetch(`http://localhost:4000/api/updatedetail/${id}`, setting);
      const json = await response.json();
      console.log(json)
    }
  }

  render() {
    const { data } = this.state;
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
            {Object.keys(data).map(key => {
              const { editEnabled } = data[key];
              return (
                <tr key={key}>
                  {Object.keys(data[key]).map((subKey, index) => {
                    const { label, value, validations } = (data[key])[subKey];
                    if ( validations === undefined) {
                    console.log(value, validations, subKey, key)
                    }
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
                    if (subKey === 'editEnabled') {
                      return (
                        <td key={subKey}>
                          {
                            !editEnabled.condition ?
                              <Button
                                onClick={(event) => this.handleEdit(event, key, subKey)}
                              >Edit</Button> :
                              <Button
                                onClick={(event) => this.handleSave(event, key, subKey)}
                              >Save</Button>
                          }
                        </td>
                      )
                    } else {
                      return (
                        <td key={subKey}>
                          {
                            // !editEnabled.condition ?
                              <>{value}</> 
                              // <>
                              //   <Input
                              //     type="text"
                              //     value={value}
                              //     validations={validations}
                              //     placeholder={label}
                              //     onChange={(event) => this.handleInput(event, key, subKey)} />
                              // </>
                          }
                        </td>
                      )
                    }
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };
};

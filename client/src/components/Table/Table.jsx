import React, { Component } from 'react';
import moment from 'moment';
import './Table.scss';
import AddNewLine from './AddNewLine';

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
        id: item.id,
        mag: item.properties.mag,
        place: item.properties.place,
        time: item.properties.time,
        url: item.properties.url,
        lat: item.geometry.coordinates[0],
        lon: item.geometry.coordinates[1],
        editEnabled: false
      }
    })
    this.setState({
      data
    })
  }

  handleInput = (event, key) => {
    const { target: { name, value } } = event;
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            [name]: value,
          }
        }
      }
    });
  }

  handleEdit = (event, key) => {
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            editEnabled: true,
          }
        }
      }
    })
  }

  handleSave = (event, key) => {
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
            editEnabled: false,
          }
        }
      }
    });
    this.sendingData(this.state.data[key])
  }

  sendingData = async (data) => {
    const { id } = data;
    const response = await fetch(`http://localhost:4000/api/getdetail/${id}`);
    const json = await response.json();
    if (json) {
      const setting = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
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
              const { lat, lon, id, mag, place, time, url, editEnabled } = data[key];
              const formatedTime = moment(time).format("YYYY-MM-DD HH:mm:ss");
              return (
                <tr key={key}>
                  <td>{id}</td>
                  {
                    !editEnabled ?
                      <td>{mag}</td> :
                      <td>
                        <input type="text" name='mag' onChange={(event) => this.handleInput(event, key)} />
                      </td>
                  }
                  {
                    !editEnabled ?
                      <td>{place}</td> :
                      <td>
                        <input type="text" name='place' onChange={(event) => this.handleInput(event, key)} />
                      </td>
                  }
                  <td>{formatedTime}</td>
                  <td>
                    <a href={url}>click here</a>
                  </td>
                  {
                    !editEnabled ?
                      <td>{lat}</td> :
                      <td>
                        <input type="text" name='lat' onChange={(event) => this.handleInput(event, key)} />
                      </td>
                  }
                  {
                    !editEnabled ?
                      <td>{lon}</td> :
                      <td>
                        <input type="text" name='lon' onChange={(event) => this.handleInput(event, key)} />
                      </td>
                  }
                  <td>
                    {!editEnabled ?
                      <button onClick={(event) => this.handleEdit(event, key)}>Edit</button> :
                      <button onClick={(event) => this.handleSave(event, key)}>Save</button>
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

import React, { Component } from 'react';
import moment from 'moment';
import './Table.scss';
import AddNewLine from './AddNewLine';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    }
  }

  componentDidMount() {
    const arr = []
    let data = {}
    this.props.requiredDatas.forEach((item, index) => {
      data = { ...item, editEnabled: false }
      arr.push(data)
    })
    this.setState({
      data: arr
    })
  }

  handleEdit = (event, id) => {
    const data = [...this.state.data];
    const index = data.findIndex(obj => obj.id === id);
    data[index].editEnabled = true;
    this.setState({
      data
    });
  }

  handleSave = (event, id) => {
    const data = [...this.state.data];
    const index = data.findIndex(obj => obj.id === id);
    data[index].editEnabled = false;
    this.setState({
      data
    });
  }

  handleInput = (event,id) => {
    const { target: { value } } = event;
    const data = [...this.state.data];
    const index = data.findIndex(obj => obj.id === id);
    data[index].properties.mag = value;
    data[index].properties.place = value;
    data[index].geometry.coordinates[0] = value;
    data[index].geometry.coordinates[1] = value;

    this.setState({
      data
    });
  }


  render() {
    const { data } = this.state;
    return (
      <div className="Table">
        {
          !data ? '' : 
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
              {data.map((item, index) => {
                const { properties, id, geometry, editEnabled } = item;
                const { mag, place, time, url } = properties;
                const formatedTime = moment(time).format("YYYY-MM-DD HH:mm:ss");
                const { coordinates } = geometry;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    {
                      !editEnabled ? 
                        <td>{mag}</td> : 
                        <td>
                          <input type="text" onChange={(event) => this.handleInput(event, id)} />
                        </td>
                    }
                    {
                      !editEnabled ? 
                        <td>{place}</td> : 
                        <td>
                          <input type="text" onChange={(event) => this.handleInput(event, id)}/>
                        </td>
                    }
                    <td>{formatedTime}</td>
                    <td>
                      <a href={url}>click here</a>
                    </td>
                    {
                      !editEnabled ? 
                        <td>{coordinates[0]}</td> : 
                        <td>
                          <input type="text" onChange={(event) => this.handleInput(event, id)}/>
                        </td>
                    }
                    {
                      !editEnabled ? 
                      <td>{coordinates[1]}</td> : 
                      <td>
                        <input type="text" onChange={(event) => this.handleInput(event, id)}/>
                        </td>
                    }
                    <td>
                      {
                        !editEnabled ?
                          <p onClick={(event) => this.handleEdit(event, id)}>Edit</p> :
                          <p onClick={(event) => this.handleSave(event, id)}>Save</p>
                      }
                    </td>
                  </tr>
                )
              })}
                
            </tbody>
          </table>
        }
        <AddNewLine />
      </div>  
    );
  };
};

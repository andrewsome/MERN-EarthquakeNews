import React, { Component } from 'react';
import moment from 'moment';
import Button from '../../Button';

export default class RenderDetail extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="EarthquakeDetail__details">
        {
          !data ?
            <p>Please enter an earthquake ID</p> :
            this.renderDetail()
        }
      </div>
    )
  }

  renderDetail = () => {
    const { editEnabled, data, temporaryData, handleTempData, handleEdit, handleSave } = this.props;
    const { tempPlace, tempMag, tempLat, tempLon } = temporaryData;
    const { id, mag, place, time, url, lat, lon } = data;
    const formatedTime = moment(time).format("YYYY-MM-DD HH:mm:ss");
    return (
      <div>
        <p>ID: {id}</p> 
        {
          !editEnabled ?
            <p>Magnitude: {mag}</p> :
            <p>Magnitude:
            <input
              type="text"
              name="tempMag"
              placeholder={mag}
              value={tempMag}
              onChange={(event) => handleTempData(event)} />
            </p>
        }
        {
          !editEnabled ?
            <p>Place: {place}</p> :
            <p>Place:
            <input
              type="text"
              name="tempPlace"
              placeholder={place}
              value={tempPlace}
              onChange={(event) => handleTempData(event)} />
            </p>
        }
        <p>Time: {formatedTime}</p>
        <p>More information:
          <a href={url}>{url}</a>
        </p>
        {
          !editEnabled ?
            <p>Coordinates: {lat},{lon}</p> :
            <p>Coordinates:
            <input
              type="text"
              name="tempLat"
              placeholder={lat}
              value={tempLat}
              onChange={(event) => handleTempData(event)} />,
            <input
              type="text"
              name="tempLon"
              placeholder={lon}
              value={tempLon}
              onChange={(event) => handleTempData(event)} />
            </p>
        }
        {
          !editEnabled ? 
            <Button onClick={handleEdit}>Edit</Button> :
            <Button onClick={handleSave}>Save</Button>
        }
      </div>
    )
  }
}

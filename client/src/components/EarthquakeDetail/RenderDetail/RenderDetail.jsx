import React, { Component } from 'react';
import moment from 'moment';
import Button from '../../Button';
import Input from './Input';

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
    const NUMBER_REGEX = /^\d*\.?\d*$/;
    const formatedTime = moment(time).format("YYYY-MM-DD HH:mm:ss");
    return (
      <div>
        <p>ID: {id}</p> 
        {
          !editEnabled ?
            <p>Magnitude: {mag}</p> :
            <p>Magnitude:
            <Input
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
            <Input
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
            <Input
              type="text"
              name="tempLat"
              placeholder={lat}
              value={tempLat}
              onChange={(event) => handleTempData(event)} />,
            <Input
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
            <Button 
              onClick={handleSave} 
              disabled={
                !NUMBER_REGEX.test(tempMag) ||
                !NUMBER_REGEX.test(tempLat) ||
                !NUMBER_REGEX.test(tempLon)
              } 
            >Save</Button>
        }
      </div>
    )
  }
}

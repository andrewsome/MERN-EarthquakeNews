import React, { Component } from 'react';
import Button from '../../Button';
import Input from '../../Input';

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
    const { editEnabled, data, handleTempInputData, handleEdit, handleSave } = this.props;
    return (
      <div>
        {Object.keys(data).map(key => {
          const { label, value, validations } = data[key];
          if (key === 'id' || key === 'time') {
            return (
              <p key={key}>{label}: {value}</p>
            )
          }
          if (key === 'url') {
            return (
              <p key={key}>{label}: <a href={value}>{value}</a></p>
            )
          }
          return (
            <div key={key}>
              {
                !editEnabled ?
                  <p>{label}: {value}</p> :
                  <span>{label}:
                  <Input
                    type="text"
                    value={value}
                    validations={validations}
                    placeholder={label}
                    onChange={(event) => handleTempInputData(event, key)} />
                  </span>
              }
            </div>
          )
        })}
        {
          !editEnabled ? 
            <Button onClick={handleEdit}>Edit</Button> :
            <Button 
              onClick={handleSave} 
              disabled={
                !data.place.value ||
                !data.lat.value ||
                !data.lon.value ||
                !data.mag.value
                }
            >Save</Button>
        }
      </div>
    )
  }
}

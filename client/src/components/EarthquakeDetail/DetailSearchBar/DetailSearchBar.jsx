import React, { Component } from 'react';
import Button from '../../Button';

export default class DetailSearchBar extends Component {
  render() {
    const { earthquakeId, handleSubmit, handleInputId} = this.props;
    return (
      <div>
        <form 
          className="EarthquakeDetail__id-field" 
          onSubmit={(event) => handleSubmit(event, earthquakeId)}
        >
          <label>Earthquake ID:</label>
          <input 
            type="text"
            value={earthquakeId}
            onChange={handleInputId}
          />
          <Button type="submit" >Retrieve</Button>
        </form>
      </div>
    )
  }
}

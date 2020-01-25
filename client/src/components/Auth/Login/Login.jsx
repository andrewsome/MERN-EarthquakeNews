import React, { Component } from 'react';
import Button from '../../Button';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleInput = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async () => {
    // const response = await fetch('');
    // console.log(response)
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div>
          <div>
            <label htmlFor="name">Userame</label>
            <input 
              type="text" 
              name="username" 
              value={username} 
              onChange={event => this.handleInput(event)}
              required 
              />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="text" 
              name="password" 
              value={password}
              onChange={event => this.handleInput(event)}
              required />
          </div>
          <Button onChange={this.handleSubmit}>Register</Button>
        </div>
      </div>
    )
  }
}
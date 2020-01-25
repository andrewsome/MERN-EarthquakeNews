import React, { Component } from 'react';
import Button from '../../Button';
import { register } from '../utlis';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isAdmin: false,
    }
  }

  handleInput = (event) => {
    const { target: { name, value, checked } } = event;
    if (name === 'isAdmin') {
      this.setState({
        [name]: checked,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  handleSubmit = async () => {
    const newUser = {
      username: this.state.username,
      password: this.state.password
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    const { username, password, isAdmin } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <div>
          <div>
            <label htmlFor="name">Name</label>
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
          <div>
            <input 
              name="isAdmin"
              checked={isAdmin}
              onChange={event => this.handleInput(event)}
              type="checkBox"/> Admin
          </div>
          <Button onChange={this.handleSubmit}>Register</Button>
        </div>
      </div>
    )
  }
}

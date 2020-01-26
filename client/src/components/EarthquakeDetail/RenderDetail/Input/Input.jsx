import React, { Component } from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.span`
  color:red;
  padding-left:1rem;
`;

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
    }
  }

  validation = () => {
    const { name, value } = this.props;
    const NUMBER_REGEX = /^\d*\.?\d*$/;
    if (!value ) {
      return 'Empty Input';
    }
    if (name !== 'tempPlace') {
      if (!NUMBER_REGEX.test(value)) {
        return 'Invalid Input';
      }
      return null;
    }
    return null;
  }

  render() {
    const { dirty } = this.state;

    const validationMessage = this.validation()
    return (
      <>
        <span>
          <input
            {...this.props}
            onChange={(e) => {
              this.setState({
                dirty: true,
              })
              this.props.onChange(e)
            }}
          />
            {dirty && validationMessage && (
              <ErrorMessage>{validationMessage}</ErrorMessage>
            )}
        </span>
      </>
    )
  }
}

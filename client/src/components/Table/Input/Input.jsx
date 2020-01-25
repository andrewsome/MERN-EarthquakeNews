import React, { Component } from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color:red;
  padding-left:1rem;
`;

const StyledInput = styled.input`
  margin: 1.5rem;
`;

export default class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dirty: false,
    }
  }

  isValidationInvalid = (validation) => {
    const { value } = this.props;
    const { validator, options } = validation;

    const invalid = !validator(value, options);

    return invalid;
  }

  getValidationMessageFromValidations = () => {
    const { validations } = this.props;

    const invalidValidation = validations.find((validation) => !!this.isValidationInvalid(validation));

    return invalidValidation && invalidValidation.message;
  }

  render() {
    const { dirty } = this.state;

    const validationMessage = this.getValidationMessageFromValidations()
    return (
      <>
        <div>
          <StyledInput
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
        </div>
      </>
    )
  }
}

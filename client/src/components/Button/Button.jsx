import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  background: gray;
  cursor: pointer;
  margin: auto;
  width: 8rem;
  padding: .5rem;
  font-size: 1rem;
  outline: none;
  &:hover {
    background: lightblue;
  }
  &:active {
    background: lightblue;
    transform: translateY(4px);
  }
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 4rem;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 4.5rem;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
   width: 5rem; 
  }
`;

export default StyledButton;

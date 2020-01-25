import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  background: gray;
  cursor: pointer;
  margin: auto;
  width: 8rem;
  padding: .5rem;
  outline: none;
  &:hover {
    background: lightblue;
  }
  &:active {
    background: lightblue;
    transform: translateY(4px);
  }
`;

export default StyledButton;

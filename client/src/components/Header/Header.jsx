import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  background: lightblue;
  text-align: center;
  height: 6rem;
  padding-top: 4rem;
  margin: .1rem;
`;

const Header = ({
  children,
}) => (
  <Container>{children}</Container>
);

export default Header;
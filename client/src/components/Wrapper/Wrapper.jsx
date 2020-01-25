import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3rem auto;
  max-width: 90%;
  min-width: 1000px;
  background: grey;
  text-align: center;
`;

const Wrapper = ({
  children,
}) => (
  <Container>{children}</Container>
);

export default Wrapper;

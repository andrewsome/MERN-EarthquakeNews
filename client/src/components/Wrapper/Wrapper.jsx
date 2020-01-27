import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3rem auto;
  max-width: 90%;
  background: grey;
  text-align: center;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin: 0;
    max-width: 100%;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    margin: 0;
    max-width: 100%;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin: 3rem auto;
    max-width: 90%;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    margin: 3rem auto;
    max-width: 1000px;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    margin: auto;
    max-width: 1000px;
  }
`;

const Wrapper = ({
  children,
}) => (
  <Container>{children}</Container>
);

export default Wrapper;

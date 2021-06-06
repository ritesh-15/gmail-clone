import React from "react";
import styled from "styled-components";

function Network() {
  return (
    <Container>
      <p>Network not connected !</p>
    </Container>
  );
}

export default Network;

const Container = styled.div`
  position: fixed;
  z-index: 1500;
  left: 45%;
  right: 40%;
  top: 5px;
  background-color: #f9edbe;
  padding: 10px;
  width: fit-content;

  p {
    font-size: 16px;
    font-weight: 600;
  }
`;

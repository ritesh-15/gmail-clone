import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {};

  return (
    <Container>
      <Content>
        <img src="https://1000logos.net/wp-content/uploads/2018/05/Gmail-logo.jpg" />
        <button onClick={(e) => signIn()}>Sign In with google</button>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  width: fit-content;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  img {
    width: 300px;
    object-fit: contain;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #1a73e8;
    color: #ffffff;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 250ms ease-in;
    letter-spacing: 1.1px;

    &:hover {
      background-color: #4284f5;
    }
  }
`;

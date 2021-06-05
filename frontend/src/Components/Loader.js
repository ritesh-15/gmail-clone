import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

function Loader({ text }) {
  return (
    <LoadingContainer>
      <Spinner />
      <span>Loading {text} ...</span>
    </LoadingContainer>
  );
}

export default Loader;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  span {
    margin-left: 30px;
    text-align: center;
  }
`;

const Spinner = styled(CircularProgress)`
  color: #d93025 !important;
`;

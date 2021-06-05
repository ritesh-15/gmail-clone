import React from "react";
import styled from "styled-components";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { Link } from "react-router-dom";

function Mail({ info }) {
  return (
    <Link to={`/mail/${info._id}`}>
      <Container>
        <RightContainer>
          <CheckBoxOutlineBlankIcon style={{ marginRight: "10px" }} />
          <StarOutlineIcon style={{ marginRight: "10px" }} />
          <LabelImportantIcon
            style={{ marginRight: "10px", color: "#F7CB4D" }}
          />
          <span>{info.subject}</span>
        </RightContainer>
        <Content>{info.message}</Content>
        <p>{new Date(info.timestamp).toLocaleTimeString()}</p>
      </Container>
    </Link>
  );
}

export default Mail;

const Container = styled.div`
  width: 100%;
  padding: 6px 20px;
  background-color: #ffffff;
  border-top: 1px solid #eceff1;
  border-bottom: 1px solid #eceff1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  color: #7f7f7f;
  justify-content: space-between;
  transition: all 160ms ease-in;
  cursor: pointer;
  p {
    font-weight: 600;
    font-size: 14px;
    color: grey;
    text-align: center;
  }

  &:hover {
    transform: scale(1.012);
    box-shadow: -1px 2px 10px 2px rgba(229, 229, 229, 0.75);
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 400px;
  min-width: 400px;
  span {
    font-size: 16px;
    font-weight: 600;
    color: #000;
    text-transform: capitalize;
    word-wrap: wrap;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  white-space: nowrap;
  z-index: 0;
  overflow: hidden;
`;

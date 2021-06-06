import React, { useState } from "react";
import styled from "styled-components";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { Link, useHistory } from "react-router-dom";
import axios from "../axios";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { StarOutline } from "@material-ui/icons";
import StarIcon from "@material-ui/icons/Star";

function Mail({ info, hide }) {
  const history = useHistory();
  const [seen, setSeen] = useState(false);
  const [star, setStar] = useState(false);

  const user = useSelector(selectUser);

  const setStarMessage = () => {
    axios.post("/star/email", {
      uid: user.userId,
      _id: info._id,
      name: user.userName,
      emailId: user.userEmail,
      to: info.to,
      subject: info.subject,
      message: info.message,
      timestamp: new Date().toUTCString(),
    });
    setStar(true);
  };

  return (
    <Container
      style={
        seen ? { backgroundColor: "lightgray" } : { backgroundColor: "#ffffff" }
      }
    >
      <RightContainer>
        <CheckBoxOutlineBlankIcon style={{ marginRight: "10px" }} />
        {star ? (
          <AddedStar style={{ marginRight: "10px" }} />
        ) : !hide ? (
          <Star
            onClick={(e) => setStarMessage()}
            style={{ marginRight: "10px" }}
          />
        ) : (
          <AddedStar style={{ marginRight: "10px" }} />
        )}
        <LabelImportantIcon style={{ marginRight: "10px", color: "#F7CB4D" }} />
        <Link to={`/mail/${info._id}`} style={{ overflow: "hidden" }}>
          <span>{info.subject}</span>
        </Link>
      </RightContainer>
      <Content>{info.message}</Content>
      <p>{new Date(info.timestamp).toLocaleTimeString()}</p>
    </Container>
  );
}

export default Mail;

const AddedStar = styled(StarIcon)`
  color: #f9d87a;
`;

const Star = styled(StarOutlineIcon)``;

const Container = styled.div`
  width: 100%;
  padding: 6px 20px;
  background-color: #ffffff;
  border-top: 1px solid #eceff1;
  border-bottom: 1px solid #eceff1;
  border-radius: 6px;
  z-index: 1;
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
    z-index: 0;
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
    text-transform: none;
    word-wrap: wrap;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  white-space: nowrap;
  z-index: 0;
  overflow: hidden;
`;

import React, { useState } from "react";
import styled from "styled-components";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { Link, useHistory } from "react-router-dom";
import axios from "../axios";
import { selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { StarOutline } from "@material-ui/icons";
import StarIcon from "@material-ui/icons/Star";
import { setStarRefresh } from "../features/sendingMail";

function Mail({ info, hide }) {
  const history = useHistory();
  const [seen, setSeen] = useState(false);
  const [star, setStar] = useState(false);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const setStarMessage = () => {
    axios
      .post("/star/email", {
        uid: user.userId,
        _id: info._id,
        name: user.userName,
        emailId: user.userEmail,
        to: info.to,
        subject: info.subject,
        message: info.message,
        timestamp: new Date().toUTCString(),
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(`/stared/set/${info._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const removeFromStar = () => {
    axios
      .get(`/star/delete/${info._id}`)
      .then((res) => {
        dispatch(setStarRefresh());
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(`/stared/unset/${info._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Container
      style={
        seen ? { backgroundColor: "lightgray" } : { backgroundColor: "#ffffff" }
      }
    >
      <RightContainer>
        <IconDivRight>
          <CheckBoxOutlineBlankIcon style={{ marginRight: "10px" }} />
          {user?.userId !== info.uid ? (
            info.stared ? (
              <AddedStar
                onClick={removeFromStar}
                style={{ marginRight: "10px" }}
              />
            ) : !hide ? (
              <Star
                onClick={(e) => setStarMessage()}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <AddedStar
                onClick={removeFromStar}
                style={{ marginRight: "10px" }}
              />
            )
          ) : (
            "   "
          )}
          <LabelImportantIcon
            style={{ marginRight: "10px", color: "#F7CB4D" }}
          />
        </IconDivRight>
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

const IconDivRight = styled.div`
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddedStar = styled(StarIcon)`
  color: #f9d87a;
`;

const Star = styled(StarOutlineIcon)``;

const Container = styled.div`
  width: 100%;
  padding: 6px 0px;
  padding-left: 20px;
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
    white-space: nowrap;
    overflow: hidden;
    justify-self: flex-end;
    width: 100%;
    max-width: 200px;
  }

  &:hover {
    transform: scale(1.015);
    box-shadow: -1px 2px 10px 2px rgba(229, 229, 229, 0.75);
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 400px;
  width: 100%;
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

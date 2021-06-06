import React, { useState } from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import FormatColorTextOutlinedIcon from "@material-ui/icons/FormatColorTextOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { defaultMail, selectSendMail } from "../features/emailSlice";
import axios from "../axios";
import { selectUser } from "../features/userSlice";
import {
  selectSending,
  setComplete,
  setSending,
} from "../features/sendingMail";
import { LinearProgress } from "@material-ui/core";

function SendMail() {
  const dispatch = useDispatch();
  const send = useSelector(selectSendMail);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  const closeMail = () => {
    dispatch(defaultMail());
    setTo("");
    setMessage("");
    setSubject("");
  };

  const sendEmail = () => {
    dispatch(setSending());
    axios
      .post("/new/mail", {
        name: user.userName,
        emailId: user.userEmail,
        message: message,
        timestamp: new Date().toUTCString(),
        to: to,
        subject: subject,
        photoURL: user.photoURL,
        uid: user.userId,
        attachments: {
          attach: null,
          copies: null,
        },
      })
      .then((res) => {
        dispatch(setComplete());
        closeMail();
      })
      .catch((err) => alert(err.message));
  };

  const sending = useSelector(selectSending);

  return (
    <>
      {send ? (
        <Container>
          <SendTop>
            <span>New Message</span>
            <Close
              onClick={(e) => {
                closeMail();
              }}
            />
          </SendTop>

          <SendBody>
            <input
              type="email"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              row={4}
              cols={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {sending && <Bar color="primary" />}
          </SendBody>
          <SendBottom>
            <div>
              <button
                disabled={!subject || !to ? true : false}
                onClick={(e) => sendEmail()}
              >
                Send
              </button>
              <FormatColorTextOutlinedIcon
                style={{ marginRight: "10px", marginLeft: "10px" }}
              />
              <AttachFileOutlinedIcon style={{ marginRight: "10px" }} />
              <AttachmentOutlinedIcon style={{ marginRight: "10px" }} />
              <EmojiEmotionsOutlinedIcon style={{ marginRight: "10px" }} />
              <PhotoOutlinedIcon style={{ marginRight: "10px" }} />
              <LockOpenOutlinedIcon style={{ marginRight: "10px" }} />
              <CreateOutlinedIcon style={{ marginRight: "10px" }} />
            </div>
            <div>
              <MoreVertOutlinedIcon style={{ marginRight: "10px" }} />
              <DeleteIcon style={{ marginRight: "10px" }} />
            </div>
          </SendBottom>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}

export default SendMail;

const Bar = styled(LinearProgress)`
  background-color: #ffffff !important;
  height: 3px;
`;

const Container = styled.div`
  position: absolute;
  right: 0;
  z-index: 500;
  top: 25%;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  box-shadow: -4px 1px 5px 0px rgba(206, 206, 206, 0.75);
`;

const SendTop = styled.div`
  width: 100%;
  background-color: #404040;
  padding: 6px 10px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SendBody = styled.div`
  width: 100%;

  input {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid lightgrey;
    padding: 8px 10px;
    border-radius: 8px;
  }

  textarea {
    width: 100%;
    resize: none;
    border: none;
    height: 300px;
    outline: none;
    padding: 8px 10px;
  }
`;

const SendBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  justify-content: space-between;
  margin-bottom: 10px;
  z-index: 100 !important;

  div {
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: #969696;
    cursor: pointer;
  }

  button {
    padding: 8px 20px;
    border: none;
    background-color: #1a73e8;
    color: #ffffff;
    cursor: pointer;
    transition: all 160ms ease-in;

    &:hover {
      background-color: #669df6;
    }
  }
`;

const Close = styled(CloseOutlinedIcon)`
  cursor: pointer;
`;

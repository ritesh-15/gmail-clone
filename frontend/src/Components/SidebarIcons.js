import React from "react";
import styled from "styled-components";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";

function SidebarIcons(props) {
  return (
    <Container
      style={
        props.text == "Inbox"
          ? { backgroundColor: "#FCE8E6" }
          : { backgroundColor: "#ffffff" }
      }
    >
      {props.icon}
      <span
        style={
          props.text == "Inbox"
            ? { color: "#D93025", fontWeight: "800" }
            : { color: "#767676" }
        }
      >
        {props.text}
      </span>
      <p>{props.inbox}</p>
    </Container>
  );
}

export default SidebarIcons;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  align-items: center;
  width: 100%;
  padding: 5px 20px;
  border-radius: 999px;
  color: #767676;
  cursor: pointer !important;

  span {
    margin-left: 10px;
    font-size: 16px;
  }

  p {
    margin-left: auto;
    color: #d93025;
    font-weight: 600;
  }
  &:hover {
    background-color: "#F1F3F4" !important;
  }
`;

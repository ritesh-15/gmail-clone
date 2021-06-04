import React from "react";
import styled from "styled-components";
import SidebarIcons from "./SidebarIcons";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import SnoozeOutlinedIcon from "@material-ui/icons/SnoozeOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import VideocamIcon from "@material-ui/icons/Videocam";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useDispatch, useSelector } from "react-redux";
import { selectSendMail, setSendMail } from "../features/emailSlice";

function Sidebar() {
  const dispatch = useDispatch();
  // const sendMail = useSelector(selectSendMail);

  const composeMail = () => {
    dispatch(setSendMail());
  };

  return (
    <Container>
      <Compose onClick={(e) => composeMail()}>
        <img src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png" />
        <span>Compose</span>
      </Compose>

      <SidebarTop>
        <SidebarIcons
          icon={
            <InboxOutlinedIcon
              style={{ color: "#D93025", fontWeight: "800 !important" }}
            />
          }
          text={"Inbox"}
          backgroundColor="#FCE8E6"
        />
        <SidebarIcons icon={<StarOutlinedIcon />} text="Stared" />
        <SidebarIcons icon={<SnoozeOutlinedIcon />} text="Snoozed" />
        <SidebarIcons icon={<SendOutlinedIcon />} text="Send" />
        <SidebarIcons icon={<DraftsOutlinedIcon />} text="Draft" />
        <SidebarIcons icon={<KeyboardArrowDownOutlinedIcon />} text="More" />
      </SidebarTop>

      <SidebarBottom>
        <p>Meet</p>
        <SidebarIcons icon={<VideocamIcon />} text="New meetings" />
        <SidebarIcons icon={<CalendarTodayIcon />} text="My meetings" />
      </SidebarBottom>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.15;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px;
`;

const Compose = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border: none;
  border-radius: 999px;
  background-color: #ffffff;
  box-shadow: -1px 7px 5px 0px rgba(234, 237, 237, 0.97);
  -webkit-box-shadow: -1px 7px 5px 0px rgba(234, 237, 237, 0.97);
  -moz-box-shadow: -1px 7px 5px 0px rgba(234, 237, 237, 0.97);
  font-size: 14px;
  letter-spacing: 1.3px;
  cursor: pointer;
  transition: all 250ms ease-in;

  span {
    margin-left: 10px;
  }

  &:hover {
    box-shadow: -1px 7px 10px 2px rgba(229, 229, 229, 0.75);
  }
`;

const SidebarTop = styled.div`
  border-bottom: 1px solid lightgray;
  width: 100%;
  padding: 10px 0;
`;

const SidebarBottom = styled.div`
  width: 100%;
  margin-top: 10px;

  p {
    width: 100%;
    text-align: left;
    padding: 0 20px;
    font-weight: 600;
  }
`;

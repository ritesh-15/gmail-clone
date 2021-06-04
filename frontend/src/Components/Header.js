import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import { Avatar } from "@material-ui/core";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

function Header() {
  return (
    <Container>
      <HeaderRight>
        <Menu />
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" />
      </HeaderRight>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
      </HeaderSearch>
      <HeaderLeft>
        <Help />
        <Setting />
        <App />
        <Avatar />
      </HeaderLeft>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 0 20px;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-left: 10px;
  }
`;

const Menu = styled(MenuOutlinedIcon)`
  color: #5f6368;
  cursor: pointer;
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  width: 100%;
  max-width: 700px;
  padding: 8px 10px;
  border-radius: 8px;
  transition: all 250ms ease-in;
  border: 1px solid #ffffff;
  box-shadow: 0 0 0 0 #ffffff;

  input {
    width: 100%;
    padding: 5px;
    border: none;
    background: transparent;
    font-size: 14px;
    text-transform: none;
    letter-spacing: 1.3px;
    outline: none;
    margin-left: 10px;
  }

  &:focus-within {
    background-color: #ffffff;
    border: 1px solid lightgray;
    box-shadow: -1px 7px 5px 0px rgba(234, 237, 237, 0.97);
    -webkit-box-shadow: -1px 7px 5px 0px rgba(234, 237, 237, 0.97);
    -moz-box-shadow: -1px 7px 5px 0px rgba(234, 237, 237, 0.97);
  }
`;

const SearchIcon = styled(Search)`
  color: #5f6368;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  color: #5f6368;
`;

const Help = styled(HelpOutlineOutlinedIcon)`
  margin-right: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 2.2rem !important;
  padding: 5px;
  transition: all 250ms ease-in;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const Setting = styled(SettingsOutlinedIcon)`
  margin-right: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 2.2rem !important;
  padding: 5px;
  transition: all 250ms ease-in;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const App = styled(AppsOutlinedIcon)`
  margin-right: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 2.2rem !important;
  padding: 5px;
  transition: all 250ms ease-in;

  &:hover {
    background-color: #f1f3f4;
  }
`;

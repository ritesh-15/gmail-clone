import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import { Avatar, LinearProgress } from "@material-ui/core";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setSignOut } from "../features/userSlice";
import { auth, provider } from "../firebase";
import { selectRefresh, selectSending } from "../features/sendingMail";

function Header() {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setSignOut());
      })
      .catch((err) => alert(err.message));
  };

  const refresh = useSelector(selectRefresh);

  return (
    <>
      <Container>
        <HeaderRight>
          <Menu />
          <Link to="/">
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" />
          </Link>
        </HeaderRight>
        <HeaderSearch>
          <SearchIcon />
          <input type="text" placeholder="Search mail" />
        </HeaderSearch>
        <HeaderLeft>
          <Help />
          <Setting />
          <App />
          <Profile
            onMouseEnter={(e) => setShow(true)}
            onMouseLeave={(e) => setShow(false)}
            src={user?.photoURL}
            alt={user?.name}
          />
          {show ? (
            <OptionsDiv
              onMouseEnter={(e) => setShow(true)}
              onMouseLeave={(e) => setShow(false)}
            >
              <span onClick={signOut}>Log Out</span>
            </OptionsDiv>
          ) : (
            ""
          )}
        </HeaderLeft>
      </Container>
      {refresh && <Bar color="secondary" />}
    </>
  );
}

export default Header;

const Bar = styled(LinearProgress)`
  background-color: #ffffff !important;
  height: 2.5px !important;
`;

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 0 20px;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  z-index: 1000;
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
  position: relative;
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

const Profile = styled(Avatar)`
  cursor: pointer;
`;

const OptionsDiv = styled.div`
  position: absolute;
  bottom: 0;
  height: 50px;
  top: 40px;
  z-index: 10000 !important;
  right: -5px;
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: center;
  color: #000;
  border: 1px solid #ffffff;
  border-radius: 8px;
  box-shadow: -1px 4px 17px 0px rgba(219, 219, 219, 0.75);

  &:hover {
    border: 1px solid grey;
  }

  span {
    cursor: pointer;
  }
`;

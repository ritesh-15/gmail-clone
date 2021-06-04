import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import RefreshIcon from "@material-ui/icons/Refresh";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { InboxOutlined, KeyboardArrowRight } from "@material-ui/icons";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import GroupIcon from "@material-ui/icons/Group";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Mail from "./Mail";
import SendMail from "./SendMail";

function Home() {
  return (
    <Container>
      <Sidebar />
      <Main>
        <MainTop>
          <TopLeft>
            <CheckBoxOutlineBlankIcon style={{ marginRight: "20px" }} />
            <RefreshIcon style={{ marginRight: "20px" }} />
            <MoreVertIcon style={{ marginRight: "20px" }} />
          </TopLeft>
          <TopRight>
            <KeyboardArrowLeftIcon style={{ marginRight: "20px" }} />
            <KeyboardArrowRight style={{ marginRight: "20px" }} />
            <HorizontalSplitIcon style={{ marginRight: "20px" }} />
          </TopRight>
        </MainTop>
        <MainMiddle>
          <Primary>
            <InboxOutlined />
            <p>Primary</p>
          </Primary>
          <div>
            <GroupIcon />
            <p>Social</p>
          </div>
          <div>
            <LocalOfferIcon />
            <p>Pramotions</p>
          </div>
        </MainMiddle>
        <MainBottom>
          <Mail />
          <Mail />
          <Mail />
        </MainBottom>
        <SendMail />
      </Main>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  position: relative;
`;

const MainTop = styled.div`
  background-color: #ffffff;
  flex: 0.03;
  display: flex;
  align-items: center;
  color: #7f7f7f;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom: 1px solid #eceff1;
  z-index: 100;
`;

const MainBottom = styled.div`
  background-color: #ffffff;
  flex: 0.94;
  width: 100%;
  overflow-y: scroll;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

const TopLeft = styled.div`
  cursor: pointer;
`;

const TopRight = styled(TopLeft)``;

const MainMiddle = styled.div`
  flex: 0.07;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  max-width: 800px;
  border-bottom: 1px solid #eceff1;
  z-index: 100;

  div {
    display: flex;
    align-items: center;
    color: #7f7f7f;
    padding: 15px 10px;
    width: 100%;
    cursor: pointer;
    transition: all 100ms ease-in;
    letter-spacing: 1.01px;
    margin-right: 10px;

    p {
      margin-left: 10px;
      color: #7f7f7f;
      font-size: 14px;
    }

    &:hover {
      background-color: #f2f2f2;
      color: #000;
    }
  }
`;

const Primary = styled.div`
  color: #d93025 !important;
  font-weight: 600;
  border-bottom: 4px solid #d93025;

  p {
    color: #d93025 !important;
  }
`;

import React, { useEffect, useState } from "react";
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
import axios from "../axios";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Redirect } from "react-router";
import Description from "./Description";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArchiveIcon from "@material-ui/icons/Archive";
import ReportIcon from "@material-ui/icons/Report";
import DeleteIcon from "@material-ui/icons/Delete";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import LabelIcon from "@material-ui/icons/Label";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Pusher from "pusher-js";
import { RefreshOutlined } from "@material-ui/icons";
import {
  setComplete,
  setOnRefresh,
  setRefresh,
  setSending,
  setStarRefresh,
} from "../features/sendingMail";
import { setNetwork, setUnsetNetwork } from "../features/networkSlice";
import Send from "./Send";
import { setMails } from "../features/mails";
import Star from "./Star";

function Home({ hide, send, star, desc, starHead }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    syncFeed();
  }, []);

  const syncFeed = async () => {
    setLoading(true);
    await axios.get("/retrive/emails").then((res) => {
      setEmails(res.data);
      setLoading(false);
      dispatch(setMails(res.data));
    });
  };

  const refreshFeed = async () => {
    const ifConnected = window.navigator.onLine;
    if (ifConnected) {
      dispatch(setUnsetNetwork());
    } else {
      dispatch(setNetwork());
    }

    dispatch(setRefresh());
    await axios.get("/retrive/emails").then((res) => {
      setEmails(res.data);
      dispatch(setOnRefresh());
      dispatch(setMails(res.data));
    });
  };

  useEffect(() => {
    const pusher = new Pusher("b73ad926175b0e118dcf", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("emails");
    channel.bind("inserted", (data) => {
      refreshFeed();
    });

    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, []);

  const user = useSelector(selectUser);

  return (
    <Container>
      {!user && <Redirect to="/login" />}
      <Sidebar />
      <Main>
        {hide ? (
          <Details>
            <DetailsTop>
              {send || starHead ? (
                <TopLeft>
                  <CheckBoxOutlineBlankIcon style={{ marginRight: "20px" }} />
                  {send ? (
                    <RefreshButton
                      onClick={(e) => {
                        refreshFeed();
                      }}
                    />
                  ) : (
                    <Refresh
                      onClick={(e) => {
                        dispatch(setStarRefresh());
                      }}
                    />
                  )}
                  <MoreVertIcon style={{ marginRight: "20px" }} />
                </TopLeft>
              ) : (
                <DetailTopRight>
                  <Link to="/" style={{ color: "inherit" }}>
                    <ArrowBackIcon
                      style={{ marginRight: "21px", cursor: "pointer" }}
                    />
                  </Link>
                  <ArchiveIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <ReportIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <MarkunreadIcon
                    style={{ marginRight: "21px", cursor: "pointer" }}
                  />
                  <ScheduleIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <AssignmentTurnedInIcon
                    style={{ marginRight: "21px", cursor: "pointer" }}
                  />
                  <MoveToInboxIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <LabelIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <MoreVertIcon
                    style={{ marginRight: "21px", cursor: "pointer" }}
                  />
                </DetailTopRight>
              )}
              <DetailTopLeft>
                <KeyboardArrowLeftIcon
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <KeyboardArrowRight
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
              </DetailTopLeft>
            </DetailsTop>
            {desc && <Description />}
            {send && <Send />}
            {star && <Star />}
          </Details>
        ) : (
          <>
            <MainTop>
              <TopLeft>
                <CheckBoxOutlineBlankIcon style={{ marginRight: "20px" }} />
                <RefreshButton onClick={(e) => refreshFeed()} />
                <MoreVertIcon style={{ marginRight: "20px" }} />
              </TopLeft>
              <TopRight>
                <KeyboardArrowLeftIcon style={{ marginRight: "20px" }} />
                <KeyboardArrowRight style={{ marginRight: "20px" }} />
                <HorizontalSplitIcon style={{ marginRight: "20px" }} />
              </TopRight>
            </MainTop>
            <div>
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
            </div>
            <Bottom>
              <MainBottom>
                {loading ? (
                  <Loader text={"emails"} />
                ) : (
                  emails?.map((email) => <Mail key={email._id} info={email} />)
                )}
              </MainBottom>
            </Bottom>
          </>
        )}
        <SendMail />
      </Main>
    </Container>
  );
}

export default Home;

const Refresh = styled(RefreshOutlined)``;

const Bottom = styled.div`
  width: 100%;
  height: 100%;
`;

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
  z-index: 1;
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
  max-height: 560px;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

const TopLeft = styled.div`
  cursor: pointer;
  color: #7f7f7f;
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

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  position: relative;
`;

const DetailsTop = styled.div`
  border-bottom: 1px solid #eceff1;
  padding: 5px 0;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
`;

const DetailTopRight = styled.div`
  color: #878a8d !important;
`;

const DetailTopLeft = styled.div`
  color: #878a8d !important;
`;

const RefreshButton = styled(RefreshOutlined)``;

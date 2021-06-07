import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AttachmentIcon from "@material-ui/icons/Attachment";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import ForwardIcon from "@material-ui/icons/Forward";
import { useParams } from "react-router";
import axios from "../axios";
import Loader from "./Loader";
import { LinearProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import StarIcon from "@material-ui/icons/Star";
import { setStarRefresh } from "../features/sendingMail";

function Description() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    sync();
  }, [id]);

  const sync = () => {
    setLoading(true);
    axios
      .get(`/get/email/${id}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => console.log(err.Message));
  };

  const update = () => {
    axios
      .get(`/get/email/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err.Message));
  };

  const addToStar = () => {
    axios
      .post("/star/email", {
        uid: user.userId,
        _id: data._id,
        name: user.userName,
        emailId: user.userEmail,
        to: data.to,
        subject: data.subject,
        message: data.message,
        timestamp: new Date().toUTCString(),
      })
      .then((res) => setAdded(true))
      .catch((err) => {
        setAdded(false);
        console.log(err.message);
      });

    axios
      .get(`/stared/set/${data?._id}`)
      .then((res) => update())
      .catch((err) => console.log(err));
  };

  const removeFromStar = () => {
    axios
      .get(`/star/delete/${data._id}`)
      .then((res) => {
        dispatch(setStarRefresh());
        setAdded(false);
      })
      .catch((err) => {
        console.log(err.message);
        setAdded(true);
      });

    axios
      .get(`/stared/unset/${data?._id}`)
      .then((res) => update())
      .catch((err) => console.log(err));
  };

  return (
    <>
      {loading ? (
        <Bar color="secondary" />
      ) : (
        <Container>
          <Top>
            <div> </div>
            <h5>{data?.subject}</h5>
          </Top>
          <Content>
            <ImgDiv>
              <Avatar src={data?.photoURL} alt={data?.name} />
            </ImgDiv>
            <EmailInfo>
              <span>
                <div>
                  <h5>{data?.name}</h5>
                  <p>{data?.emailId}</p>
                </div>
                <div>
                  <AttachmentIcon
                    style={{ marginRight: "20px", color: "#878A8D" }}
                  />
                  <p>{data && new Date(data.timestamp).toLocaleTimeString()}</p>
                  {user?.userId !== data?.uid ? (
                    data?.stared ? (
                      <AddedStar
                        style={{ marginRight: "20px", color: "#878A8D" }}
                        onClick={removeFromStar}
                      />
                    ) : (
                      <StarOutlineIcon
                        style={{ marginRight: "20px", color: "#878A8D" }}
                        onClick={addToStar}
                      />
                    )
                  ) : (
                    ""
                  )}
                  <ReplyIcon
                    style={{ marginRight: "20px", color: "#878A8D" }}
                  />
                  <MoreVertIcon
                    style={{ marginRight: "20px", color: "#878A8D" }}
                  />
                </div>
              </span>
              <Message>{data?.message}</Message>
              <Actions>
                <button>
                  <ReplyIcon style={{ color: "#878A8D" }} />
                  <span>Reply</span>
                </button>
                <button>
                  <ReplyAllIcon style={{ color: "#878A8D" }} />
                  <span>Reply All</span>
                </button>
                <button>
                  <ForwardIcon style={{ color: "#878A8D" }} />
                  <span>Forward</span>
                </button>
              </Actions>
            </EmailInfo>
          </Content>
        </Container>
      )}
    </>
  );
}

export default Description;

const Bar = styled(LinearProgress)`
  background-color: #ffffff !important;
  height: 2.5px !important;
`;

const AddedStar = styled(StarIcon)`
  color: #f7cb4d !important;
`;

const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 10%;
`;

const Container = styled.div`
  padding: 20px 0;
  /* display: flex;
  flex-direction: column; */
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  margin-top: 30px;
  height: 100%;
`;

const Top = styled.div`
  display: flex;

  div {
    flex: 0.05;
    width: 100%;
  }

  h5 {
    font-size: 20px;
    font-weight: 400;
    flex: 0.95;
  }
`;

const ImgDiv = styled.div`
  flex: 0.05;
  width: 100%;
`;

const EmailInfo = styled.div`
  flex: 0.95;
  height: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      cursor: pointer;

      p {
        margin-right: 20px;
      }
    }

    h5 {
      font-size: 18px;
      letter-spacing: 1.02px;
    }

    p {
      margin-left: 10px;
      font-size: 12px;
    }
  }
`;

const Message = styled.div`
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
`;

const Actions = styled.div`
  margin-top: 10%;
  width: 100%;
  height: 100%;
  display: flex;

  button {
    padding: 5px 20px;
    margin-right: 10px;
    border: 1px solid lightgrey;
    background: transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 160ms ease-in;
    height: fit-content;
    span {
      margin-left: 10px;
    }

    &:hover {
      background-color: rgba(249, 249, 249, 1);
    }
  }
`;

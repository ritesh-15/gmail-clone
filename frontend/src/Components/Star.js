import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "../axios";
import { selectUser } from "../features/userSlice";
import Mail from "./Mail";
import {
  selectStarRefresh,
  setStarRefreshComplete,
} from "../features/sendingMail";

function Star() {
  const user = useSelector(selectUser);
  const [starMails, setStarMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Sync();
  }, []);

  const Sync = () => {
    setLoading(true);
    axios.get(`/star/${user?.userId}`).then((res) => {
      setStarMails(res.data);
      setLoading(false);
    });

    return 1;
  };

  const refresh = useSelector(selectStarRefresh);
  if (refresh) {
    const run = Sync();
    dispatch(setStarRefreshComplete());
  }

  return (
    <Container>
      {loading ? <Bar color="secondary" /> : ""}
      {starMails.length == 0 && (
        <Message>
          <p>No stared mails found</p>
        </Message>
      )}
      {starMails.map((mail) => (
        <Mail info={mail} hide />
      ))}
    </Container>
  );
}

export default Star;

const Message = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 100%;
    height: 100%;
    text-align: center;
    margin-top: 20%;
    font-size: 18px;
  }
`;

const Bar = styled(LinearProgress)`
  background-color: #ffffff !important;
  height: 2.5px !important;
`;

const Container = styled.div``;

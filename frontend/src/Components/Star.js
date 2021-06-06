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
  };

  const refresh = useSelector(selectStarRefresh);

  return (
    <Container>
      {refresh && (Sync(), dispatch(setStarRefreshComplete()))}
      {loading && <LinearProgress color="secondary" />}
      {starMails.map((mail) => (
        <Mail info={mail} hide />
      ))}
    </Container>
  );
}

export default Star;

const Container = styled.div``;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";
import Mail from "./Mail";
import axios from "../axios";
import { LinearProgress } from "@material-ui/core";
import { selectMails } from "../features/mails";

function Send() {
  const [loading, setLoading] = useState(false);

  const [mails, setMails] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/send/email/${user?.userId}`)
      .then((res) => {
        setMails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      {loading && <Bar color="secondary" />}
      {mails?.map((email) => {
        if (email.uid === user?.userId) {
          return <Mail info={email} />;
        }
      })}
    </Container>
  );
}

export default Send;

const Container = styled.div``;
const Bar = styled(LinearProgress)`
  background-color: #ffffff !important;
  height: 2.5px !important;
`;

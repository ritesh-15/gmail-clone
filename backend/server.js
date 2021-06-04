import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import email from "./email";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.status(200).send("Hello world !");
});

// post the email
app.post("/new/mail", (req, res) => {
  const body = req.body;

  res.send(body);
});

app.listen(port, () => console.log(`Connected on port ${port}`));

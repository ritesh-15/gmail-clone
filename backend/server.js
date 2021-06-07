import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import email from "./email.js";
import Pusher from "pusher";
import star from "./star.js";

// EJmYHvcUPcHY4PSv

// mongodb+srv://admin:<password>@cluster0.bym8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 9000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const pusher = new Pusher({
  appId: "1214907",
  key: "b73ad926175b0e118dcf",
  secret: "1b8253b893d9e5a03a84",
  cluster: "ap2",
  useTLS: true,
});

const url =
  "mongodb+srv://admin:EJmYHvcUPcHY4PSv@cluster0.bym8g.mongodb.net/gmaildb?retryWrites=true&w=majority";

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Db connected");
  const myCollection = db.collection("emails");
  const changeStream = myCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const emailDetails = change.fullDocument;
      pusher.trigger("emails", "inserted", {
        name: emailDetails.name,
        _id: emailDetails._id,
        to: emailDetails.to,
        timestamp: emailDetails.timestamp,
        photoURL: emailDetails.photoURL,
        subject: emailDetails.subject,
        emailId: emailDetails.emailId,
        message: emailDetails.message,
      });
    } else if (change.operationType === "update") {
      const changeDetails = change.updateDescription;
      pusher.trigger("emails", "updated", {
        stared: changeDetails.updatedFields.stared,
      });
    } else {
      console.log("Error while triggering pusher!!!");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello world !");
});

// post the email
app.post("/new/mail", (req, res) => {
  const data = req.body;
  email.create(data, (err, response) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(201).send(response);
  });
});

// get the emails

app.get("/retrive/emails", (req, res) => {
  const sort = { timestamp: -1 };
  db.collection("emails")
    .find()
    .sort(sort)
    .toArray((err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
});

// get the send email of each user

app.get("/send/email/:id", (req, res) => {
  const id = req.params.id;
  const sort = { timestamp: -1 };
  email.find({ uid: id }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    }
    data.sort((b, a) => {
      return a.timestamp - b.timestamp;
    });
    res.status(200).send(data);
  });
});

app.get("/sort/data", (req, res) => {
  const sort = { timestamp: -1 };
  db.collection("emails")
    .find()
    .sort(sort)
    .toArray((err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
});

// update the stared
app.get("/stared/set/:id", (req, res) => {
  const id = req.params.id;
  email.updateOne({ _id: id }, { $set: { stared: true } }, (err, data) => {
    if (err) {
      res.status(404).send(err.message);
    }
    res.status(200).send(data);
  });
});

app.get("/stared/unset/:id", (req, res) => {
  const id = req.params.id;
  email.updateOne({ _id: id }, { $set: { stared: false } }, (err, data) => {
    if (err) {
      res.status(404).send(err.message);
    }
    res.status(200).send(data);
  });
});

// get specific email

app.get("/get/email/:id", (req, res) => {
  const id = req.params.id;

  email.findById({ _id: id }, (err, data) => {
    if (err) {
      res.status(404).send(err.message);
    }
    res.status(200).send(data);
  });
});

// get specific user

app.post("/star/email", (req, res) => {
  const body = req.body;
  star.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(201).send(data);
  });
});

app.get("/star/:id", (req, res) => {
  const id = req.params.id;
  const sort = { timestamp: -1 };
  db.collection("stars")
    .find({ uid: id })
    .sort(sort)
    .toArray((err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
});

// delete from star database

app.get("/star/delete/:id", (req, res) => {
  const id = req.params.id;
  star.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(200).send(data);
  });
});

app.listen(port, () => console.log(`Connected on port ${port}`));

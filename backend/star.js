import mongoose from "mongoose";

const star = mongoose.Schema({
  uid: String,
  _id: String,
  name: String,
  subject: String,
  to: String,
  message: String,
  emailId: String,
  timestamp: String,
});

export default mongoose.model("stars", star);

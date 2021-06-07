import mongoose from "mongoose";

const email = mongoose.Schema({
  name: String,
  timestamp: String,
  emailId: String,
  message: String,
  to: String,
  subject: String,
  attachments: Object,
  photoURL: String,
  uid: String,
  stared: Boolean,
});

export default mongoose.model("emails", email);

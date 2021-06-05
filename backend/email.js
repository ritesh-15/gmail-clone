import mongoose from "mongoose";

const email = mongoose.Schema({
  name: String,
  timestamp: Date,
  emailId: String,
  message: String,
  to: String,
  subject: String,
  attachments: Object,
  photoURL: String,
});

export default mongoose.model("emails", email);

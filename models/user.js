import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", UserSchema);

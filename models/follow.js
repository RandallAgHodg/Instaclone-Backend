import mongoose from "mongoose";

const FollowSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  follow: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Follow", FollowSchema);

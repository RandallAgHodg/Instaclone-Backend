import mongoose from "mongoose";

const LikeSchema = mongoose.Schema({
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication",
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

export default mongoose.model("Like", LikeSchema);

import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema({
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Publication",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  comment: {
    type: String,
    trim: true,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Comment", CommentsSchema);

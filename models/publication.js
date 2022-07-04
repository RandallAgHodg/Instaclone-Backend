import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },

  file: {
    type: String,
    trim: true,
    require: true,
  },

  typeFile: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Publication", PublicationSchema);

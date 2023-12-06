import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("comments", commentSchema);

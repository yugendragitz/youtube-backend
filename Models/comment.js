import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videofiles",
      required: true,
    },

    commentbody: { type: String, required: true }, // user comment
    usercommented: { type: String, required: true }, // username

    usercity: { type: String, default: "" }, // NEW city
    lang: { type: String, default: "unknown" }, // NEW language detection

    commentedon: { type: Date, default: Date.now },

    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }, // used for auto-deletion
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comments", commentSchema);

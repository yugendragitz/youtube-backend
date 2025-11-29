import comment from "../Modals/comment.js";
import mongoose from "mongoose";

export const postcomment = async (req, res) => {
  const commentdata = req.body;
  const postcomment = new comment(commentdata);
  try {
    await postcomment.save();
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getallcomment = async (req, res) => {
  const { videoid } = req.params;
  try {
    const commentvideo = await comment.find({ videoid: videoid });
    return res.status(200).json(commentvideo);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    await comment.findByIdAndDelete(_id);
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    const updatecomment = await comment.findByIdAndUpdate(_id, {
      $set: { commentbody: commentbody },
    });
    res.status(200).json(updatecomment);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// LIKE COMMENT
export const likeComment = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await comment.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Error liking comment" });
  }
};

// DISLIKE COMMENT (with auto delete)
export const dislikeComment = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await comment.findByIdAndUpdate(
      id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );

    if (updated.dislikes >= 2) {
      await comment.findByIdAndDelete(id);
      return res.status(200).json({ deleted: true });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Error disliking comment" });
  }
};


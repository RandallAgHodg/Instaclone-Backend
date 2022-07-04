import Comment from "../models/comment.js";

const addComment = (input, ctx) => {
  try {
    const comment = new Comment({
      userId: ctx.user.id,
      publicationId: input.publicationId,
      comment: input.comment,
    });
    comment.save();
    return comment;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCommentsByPublicationId = async (publicationId) => {
  try {
    const comments = await Comment.find({ publicationId }).populate("userId");
    return comments;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { addComment, getCommentsByPublicationId };

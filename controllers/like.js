import Like from "../models/like.js";

const addLike = (publicationId, ctx) => {
  try {
    const like = new Like({
      publicationId,
      userId: ctx.user.id,
    });
    like.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getLikes = async (publicationId) => {
  try {
    const likes = await Like.countDocuments({ publicationId });
    return likes;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteLike = async (publicationId, ctx) => {
  try {
    await Like.findOneAndRemove({ publicationId }).where({
      userId: ctx.user.id,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const isLiked = async (publicationId, ctx) => {
  console.log("BRRR");
  console.log(publicationId);
  try {
    const like = await Like.findOne({ publicationId }).where({
      userId: ctx.user.id,
    });
    if (!like) throw new Error("You haven`t liked this publication");

    return true;
  } catch (error) {
    console.log(error);
    console.log("BRRR");
    return false;
  }
};

export { addLike, deleteLike, isLiked, getLikes };

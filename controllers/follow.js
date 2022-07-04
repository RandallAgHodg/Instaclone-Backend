import Follow from "../models/Follow.js";
import User from "../models/user.js";

const followUser = async (username, ctx) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("The user was not found");

  try {
    const follow = new Follow({
      userId: ctx.user.id,
      follow: user._id,
    });
    follow.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};

const isFollow = async (username, ctx) => {
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");

    const follow = await Follow.find({ userId: ctx.user.id })
      .where("follow")
      .equals(user._id);

    return follow.length > 0;
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (username, ctx) => {
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");

    const follow = await Follow.deleteOne({ userId: ctx.user.id })
      .where("follow")
      .equals(user._id);

    return follow.deletedCount > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getFollowersByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");
    const followers = await Follow.find({ follow: user._id }).populate(
      "userId"
    );

    const followersList = [];

    for await (const data of followers) {
      followersList.push(data.userId);
    }
    return followersList;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getFollowedsByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");
    const followeds = await Follow.find({ userId: user._id }).populate(
      "follow"
    );

    const followedsList = [];

    for await (const data of followeds) {
      followedsList.push(data.follow);
    }
    return followedsList;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getNotFolloweds = async (ctx) => {
  const users = await User.find().limit(10);

  const arrayUsers = [];

  for await (const user of users) {
    const isFind = await Follow.findOne({ userId: ctx.user.id })
      .where("follow")
      .equals(user._id);

    if (!isFind) {
      if (user.id.toString() !== ctx.user.id.toString()) {
        arrayUsers.push(user);
      }
    }
  }
  return arrayUsers;
};

export {
  followUser,
  isFollow,
  unfollow,
  getFollowersByUsername,
  getFollowedsByUsername,
  getNotFolloweds,
};

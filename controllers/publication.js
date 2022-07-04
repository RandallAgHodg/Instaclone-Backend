import awsUploadImage from "../utils/aws-upload-image.js";
import Publication from "../models/publication.js";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
import Follow from "../models/follow.js";

const publish = async (file, ctx) => {
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const fileName = `publication/${uuidv4()}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, fileName);
    const publication = new Publication({
      userId: ctx.user.id,
      file: result,
      typeFile: mimetype.split("/")[0],
    });

    publication.save();
    return {
      status: true,
      urlFile: result,
    };
  } catch (error) {
    return {
      status: null,
      urlFile: "",
    };
  }
  return null;
};

const getPublicationsByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");
    const publications = await Publication.find()
      .where({ userId: user._id })
      .sort({ createdAt: -1 });
    return publications;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getFollowedsPublications = async (ctx) => {
  try {
    const {
      user: { id: userId },
    } = ctx;
    const followeds = await Follow.find({ userId }).populate("follow");

    const followedsList = [];
    for await (const data of followeds) {
      followedsList.push(data.follow);
    }

    const publicationsList = [];
    for await (const data of followedsList) {
      const publications = await Publication.find()
        .where({
          userId: data._id,
        })
        .sort({ createdAt: -1 })
        .populate("userId");
      publicationsList.push(...publications);
    }

    const result = publicationsList.sort((x, y) => {
      return new Date(y.createdAt) - new Date(x.createdAt);
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { publish, getPublicationsByUsername, getFollowedsPublications };

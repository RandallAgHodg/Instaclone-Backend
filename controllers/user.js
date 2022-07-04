import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AWS from "../utils/aws-upload-image.js";

const createToken = (user, SECRET_KEY, expiresIn) => {
  const { id, name, email, username } = user;
  const payload = {
    id,
    name,
    email,
    username,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const register = async (input) => {
  const newUser = input;
  newUser.email = input.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { email, username, password } = newUser;

  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("The email is already on  use");

  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("The username is already on use");

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
  return input;
};

const login = async (input) => {
  const { email, password } = input;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new Error("Wrong credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Wrong credentials");

  return { token: createToken(user, process.env.SECRET_KEY, "24h") };
};

const getUserByIdOrUsername = async (id, username) => {
  let user = null;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });

  if (!user) throw new Error("User not found");
  return user;
};

const updateAvatar = async (file, { user: { id } }) => {
  const { createReadStream, mimetype } = await file;

  const extension = mimetype.split("/")[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await AWS(fileData, imageName);
    await User.findByIdAndUpdate(id, {
      avatar: result,
    });
    return {
      status: true,
      urlAvatar: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      urlAvatar: null,
    };
  }
};

const deleteAvatar = async ({ user: { id } }) => {
  try {
    await User.findByIdAndUpdate(id, {
      avatar: "",
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateUser = async (input, ctx) => {
  const { id } = ctx.user;
  const { password, newPassword } = input;
  try {
    if (password && newPassword) {
      const user = await User.findById(id);
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("The password is not valid");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(id, { password: hashedPassword });
    } else {
      await User.findByIdAndUpdate(id, input);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const searchUsers = async (search) => {
  const users = await User.find({
    name: { $regex: search, $options: "i" },
  });
  return users;
};

export {
  register,
  login,
  getUserByIdOrUsername,
  updateAvatar,
  deleteAvatar,
  updateUser,
  searchUsers,
};

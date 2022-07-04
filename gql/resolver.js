import {
  addComment,
  getCommentsByPublicationId,
} from "../controllers/comment.js";
import {
  followUser,
  isFollow,
  unfollow,
  getFollowersByUsername,
  getFollowedsByUsername,
  getNotFolloweds,
} from "../controllers/follow.js";
import { addLike, deleteLike, getLikes, isLiked } from "../controllers/like.js";
import {
  publish,
  getPublicationsByUsername,
  getFollowedsPublications,
} from "../controllers/publication.js";

import {
  deleteAvatar,
  getUserByIdOrUsername,
  login,
  register,
  updateAvatar,
  updateUser,
  searchUsers,
} from "../controllers/user.js";

export default {
  Query: {
    // User
    getUser: (_, { id, username }) => getUserByIdOrUsername(id, username),
    search: (_, { search }) => searchUsers(search),

    // Follow
    isFollow: (_, { username }, ctx) => isFollow(username, ctx),
    getFollowersByUsername: (_, { username }, ctx) =>
      getFollowersByUsername(username),
    getFollowedsByUsername: (_, { username }, ctx) =>
      getFollowedsByUsername(username),
    getNotFolloweds: (_, {}, ctx) => getNotFolloweds(ctx),

    // Publications
    getPublicationsByUsername: (_, { username }) =>
      getPublicationsByUsername(username),
    getFollowedsPublications: (_, {}, ctx) => getFollowedsPublications(ctx),
    // Comment
    getCommentsByPublicationId: (_, { publicationId }) =>
      getCommentsByPublicationId(publicationId),

    // isLike
    isLiked: (_, { publicationId }, ctx) => isLiked(publicationId, ctx),
    getLikes: (_, { publicationId }) => getLikes(publicationId),
  },

  Mutation: {
    // User
    register: (_, { input }) => register(input),
    login: (_, { input }) => login(input),
    updateAvatar: (_, { file }, ctx) => updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => deleteAvatar(ctx),
    updateUser: (_, { input }, ctx) => updateUser(input, ctx),

    // Follow
    follow: (_, { username }, ctx) => followUser(username, ctx),
    unfollow: (_, { username }, ctx) => unfollow(username, ctx),

    // Publication
    publish: (_, { file }, ctx) => publish(file, ctx),

    // Comment
    addComment: (_, { input }, ctx) => addComment(input, ctx),

    // Like
    addLike: (_, { publicationId }, ctx) => addLike(publicationId, ctx),
    deleteLike: (_, { publicationId }, ctx) => deleteLike(publicationId, ctx),
  },
};

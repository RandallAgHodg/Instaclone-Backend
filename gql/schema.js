import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    website: String
    description: String
    password: String
    avatar: String
    createdAt: String
  }

  type Token {
    token: String
  }

  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }

  type Publish {
    status: Boolean
    urlFile: String
  }

  type Publication {
    id: ID
    userId: ID
    file: String
    typeFile: String
    createdAt: String
  }

  type Comment {
    publicationId: ID
    userId: User
    comment: String
    createdAt: String
  }

  type FeedPublication {
    id: ID
    userId: User
    file: String
    typeFile: String
    createdAt: String
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    newPassword: String
    description: String
    website: String
  }

  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CommentInput {
    publicationId: ID
    comment: String
  }

  type Query {
    # User
    getUser(id: ID, username: String): User
    search(search: String): [User]

    # Follow
    isFollow(username: String!): Boolean
    getFollowersByUsername(username: String!): [User]
    getFollowedsByUsername(username: String!): [User]
    getNotFolloweds: [User]

    # Publication
    getPublicationsByUsername(username: String!): [Publication]
    getCommentsByPublicationId(publicationId: ID!): [Comment]
    getFollowedsPublications: [FeedPublication]

    # Like
    isLiked(publicationId: ID!): Boolean
    getLikes(publicationId: ID!): Int
  }

  type Mutation {
    # User
    register(input: UserInput): User
    login(input: LoginInput): Token
    updateAvatar(file: Upload): UpdateAvatar
    deleteAvatar: Boolean
    updateUser(input: UpdateUserInput): Boolean

    # Follow
    follow(username: String!): Boolean
    unfollow(username: String!): Boolean

    # Publication
    publish(file: Upload!): Publish

    # Comment
    addComment(input: CommentInput): Comment

    # Like
    addLike(publicationId: ID!): Boolean
    deleteLike(publicationId: ID!): Boolean
  }
`;

const Post = require("../../models/Post.js");
const { UserInputError, AuthenticationError } = require("apollo-server");
const checkAuth = require("../../utils/checkAuth.js");

module.exports = {
  Mutation: {
    addComment: async (_, { postId, body }, context) => {
      try {
        const { username } = checkAuth(context);
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      try {
        const { username } = checkAuth(context);
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (comment) => comment.id === commentId
          );
          if (post.comments[commentIndex].username == username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("Post not found not found!");
        }
      } catch (err) {
		throw new Error(err);
	  }
    },
  },
};

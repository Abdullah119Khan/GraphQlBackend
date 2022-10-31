const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/post')
const checkAuth = require('../../utils/auth')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const post = await Post.find().sort({ _id: -1})
        return post;
      } catch(err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if(post) {
          return post
        } else {
          throw new UserInputError('Post Not Found')
        }
      } catch(err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)

      const newPost = new Post({
        body,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      const post = await Post.findById(postId)

      try {
        if(user.username === post.username) {
          await post.delete()
          return 'Post deleted Successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {
        throw new Error(err)
      }
    }
  }
}
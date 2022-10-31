const { UserInputError } = require('apollo-server')
const Post = require('../../models/post')
const checkAuth = require('../../utils/auth')

module.exports = {
  Mutation: {
    createComments: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context)

      if(body.trim() === '') {
        throw new UserInputError('Body must not empty', {
          errors: {
            body: 'Body must not be empty'
          }
        })
      }
      const post = await Post.findById(postId)

      if(post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found')
      }
    }
  }
}
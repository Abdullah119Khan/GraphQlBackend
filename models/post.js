const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  like: [
    {
      username: String,
      createdAt: String,
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;
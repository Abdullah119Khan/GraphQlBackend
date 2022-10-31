const postResolvers = require('./post')
const userResolver = require('./user')
const commentsResolver = require('./comments')

module.exports = {
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolver.Mutation
  }
}
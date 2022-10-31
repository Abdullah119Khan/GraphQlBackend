const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const { MONGO_URL } = require('./config')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
.then(() => {
  console.log('DB Connection Success')
})
server.listen({ port: 4000 })
.then((res) => {
  console.log(`Server Running On PORT ${res.url}`)
})
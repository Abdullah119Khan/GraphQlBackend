const { gql } = require('apollo-server')

module.exports = gql`
  type Posts {
    id: ID!
    username: String!
    body: String!
    comments: [Comments!]
    createdAt: String!
  }
  type Comments {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Posts]
    getPost(postId: String!): Posts!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Posts!
    deletePost(postId: String!): String!
    createComments(postId: String!, body: String!): Posts!
  }
`
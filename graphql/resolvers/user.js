const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')
const { validatorRegisterInput, loginInputValidator } = require('../../utils/validators')
const { UserInputError } = require('apollo-server')

function generateToken(user) {
  return jwt.sign({
    id: user._id,
    email: user.email,
    username: user.username
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Mutation: {
    async login(_, { username, password}) {

      const { valid, errors } = loginInputValidator(username, password)

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ username, username })
      if(!user) {
        errors.general = 'User not found'
        throw new UserInputError('Errors', { errors })
      }

      const matchPass = bcrypt.compareSync(password, user.password)
      if(!matchPass) {
        errors.general = 'Password is incorrect'
        throw new UserInputError('Errors', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user.id,
        token
      }
    },
    async register(_, { registerInput: { username, email, password, confirmPassword }}
    ) {
      
      const { valid, errors } = validatorRegisterInput(
        username, email, password, confirmPassword
      )

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }
      const user = await User.findOne({ username: username })
      if(user) {
        throw new UserInputError('username already exist', {
          errors: {
            username: 'Username already exist'
          }
        })
      }

      password = bcrypt.hashSync(password, 12)

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save();

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res.id,
        token
      }
    }
  }
}
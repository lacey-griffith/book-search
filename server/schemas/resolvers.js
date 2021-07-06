const { User } = require("../models");
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        me: async (parent, args, context) => {
            if(context.user){
            const user = await User.findOne({ _id: context.user._id})
            return user
            }
            
            throw new AuthenticationError('You need to log in!')
        }
    },
    Mutation: {
        login: async (parent, {username, password}) => {
            const user = await User.findOne({ username })

            if(!user){
                throw new AuthenticationError('Wrong username or password!')
            }

            const validPassword = await user.isCorrectPassword(password)
            if(!validPassword){
                throw new AuthenticationError('Wrong username or password!')
            }

            const token = signToken(user)
            return { user, token }
        },
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { user, token }
        }
    }
}

module.exports = resolvers;
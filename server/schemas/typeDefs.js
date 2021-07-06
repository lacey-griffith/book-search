const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        bookCount: Int
    }
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        users: [User]
        me: User
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;


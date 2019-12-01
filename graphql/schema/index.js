
const {gql } = require('apollo-server');
module.exports = gql`
enum category {
    C
    Python
    Javascript
    Java
    Php
}

type User {
    _id: ID! 
    email: String!
    name: String!
    username: String!
    password: String
    urlImg: String
    active: Boolean!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    name: String!
    username: String!
    urlImg: String

}

input UserInput {
    email: String!
    name: String!
    username: String!
    password: String
    urlImg: String
}

type Query {
    currentUser : User
}
type Mutation {
    createUser(userInput: UserInput) : User
    login(username: String!,password: String!): AuthData!
}
`


const {gql } = require('apollo-server');
module.exports = gql`
enum category {
    C
    Python
    Javascript
    Java
    Php
    React_Native
    NodeJs
}

type User {
    _id: ID! 
    email: String!
    name: String!
    username: String!
    password: String
    urlImg: String
    active: Boolean!
    posts: [Post!]!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    name: String!
    username: String!
    urlImg: String

}
type Message {
    _id:ID! 
    user: User! 
    content: String! 
    post: Post!
    date: String!
}

type Post {
   _id: ID! 
   category: category !
   title: String!
   urlImg: String!
   lastMessage: String
}

input UserInput {
    email: String!
    name: String!
    username: String!
    password: String
    urlImg: String
}

input UpdateUserInput {
    _id:String!
    name: String! 
    username: String!
    password: String
    urlImg: String

}

input PostInput {
    category: category !
    title: String!
    urlImg: String!
}

type Query {
    currentUser : User
}
type Mutation {
    createUser(userInput: UserInput!) : User
    login(username: String!,password: String!): AuthData!
    updateUser(userInput: UpdateUserInput!): User

    createPost(postInput: PostInput!) : Post
}
`

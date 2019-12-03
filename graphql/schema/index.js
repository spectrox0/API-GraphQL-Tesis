
const {gql } = require('apollo-server');
module.exports = gql`
enum category {
    C
    PYTHON
    JAVASCRIPT
    JAVA
    PHP
    REACT_NATIVE
    REACT_JS
    NODE_JS
    ANGULAR
    SQL
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
    creator: String!
}

input MessageInput {
    post: String! 
    content: String
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
    createMessage(messageInput: MessageInput): Message
}
type Subscription {
    postAdded: Post
    messageAdded(postId: String!): Message
    userAdded(postId:String!): Message
}
`

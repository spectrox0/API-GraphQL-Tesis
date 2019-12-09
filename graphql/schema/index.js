const { gql } = require("apollo-server");

module.exports = gql`
  enum Category {
    "C++"
    C
    "Python"
    PYTHON
    "Javascript"
    JAVASCRIPT
    "Java"
    JAVA
    "Php"
    PHP
    "React Native"
    REACT_NATIVE
    "React.js"
    REACT_JS
    "Node.js"
    NODE_JS
    "Angular +2"
    ANGULAR
    "Sql"
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
    _id: ID!
    token: String!
  }
  type Message {
    _id: ID!
    user: User!
    content: String!
    active: Boolean!
    post: Post!
    date: String!
  }

  type Post {
    _id: ID!
    category: Category
    title: String!
    urlImg: String!
    creator: User!
    date: String!
    lastMessage: String
    messages: [Message!]!
  }

  input UserInput {
    email: String!
    name: String!
    username: String!
    password: String
    urlImg: String
  }

  input UpdateUserInput {
    _id: String!
    name: String!
    username: String!
    password: String
    urlImg: String
  }

  input PostInput {
    category: Category!
    title: String!
    urlImg: String!
    creator: String!
  }

  input MessageInput {
    postId: String!
    content: String!
    userId: String!
  }

  type Query {
    currentUser: User

    posts: [Post!]!
    post(_id: String!): Post!
    searchPost(
      first: Int!
      after: Int!
      categories: [Category!]!
      word: String!
    ): [Post!]!
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    login(username: String!, password: String!): AuthData!
    updateUser(userInput: UpdateUserInput!): User

    createPost(postInput: PostInput!, contentMessage: String!): Post!
    createMessage(messageInput: MessageInput): Message!
  }
  type Subscription {
    postAddedUser(userId: String!): Post
    messageAdded(postId: String!): Message
    lastMessagePost(postId: String!): Message
  }
`;

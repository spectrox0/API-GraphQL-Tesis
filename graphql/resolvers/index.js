// QUERYS
const authQuerys = require("./querys/auth");
const postQuerys = require("./querys/post");
// MUTATIONS
const authMutation = require("./mutations/auth");
const postMutation = require("./mutations/post");
const messageMutation = require("./mutations/message");
// SUBSCRIPTION
const postSubcription = require("./subcriptions/post");
const messageSubscription = require("./subcriptions/message");

const rootResolvers = {
  Query: {
    ...authQuerys,
    ...postQuerys
  },
  Mutation: {
    ...authMutation,
    ...postMutation,
    ...messageMutation
  },
  Subscription: {
    ...messageSubscription
  }
};
module.exports = rootResolvers;

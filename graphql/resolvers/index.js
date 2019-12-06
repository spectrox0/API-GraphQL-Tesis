/* eslint-disable node/no-unsupported-features/es-syntax */
// QUERYS
const authQuerys = require("./querys/auth");
const postQuerys = require("./querys/post");
// MUTATIONS
const authMutation = require("./mutations/auth");
const postMutation = require("./mutations/post");
const messageMutation = require("./mutations/message");
// SUBSCRIPTION
const postSubcription = require("./subcriptions/post");

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
  Subscription: {}
};
module.exports = rootResolvers;

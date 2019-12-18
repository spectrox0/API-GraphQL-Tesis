// QUERYS
const authQuerys = require("./querys/auth");
const postQuerys = require("./querys/post");
const messagesQuerys = require("./querys/messages");
const notificationQuerys = require("./querys/notification");
// MUTATIONS
const authMutation = require("./mutations/auth");
const postMutation = require("./mutations/post");
const messageMutation = require("./mutations/message");
// SUBSCRIPTION
const postSubcription = require("./subcriptions/post");
const messageSubscription = require("./subcriptions/message");
const notificationSubscription = require("./subcriptions/notification");

const rootResolvers = {
  Query: {
    ...authQuerys,
    ...postQuerys,
    ...messagesQuerys,
    ...notificationQuerys
  },
  Mutation: {
    ...authMutation,
    ...postMutation,
    ...messageMutation
  },
  Subscription: {
    ...messageSubscription,
    ...postSubcription,
    ...notificationSubscription
  }
};
module.exports = rootResolvers;

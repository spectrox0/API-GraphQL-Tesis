const jwt = require("jsonwebtoken");
const { pubsub } = require("../graphql/resolvers/pubsub.js");

module.exports = async ({ req, connection }) => {
  let authToken;

  if (connection) {
    authToken = connection.context.authToken;
    if (!authToken) return { pubsub };
  } else {
    authToken = req.get("Authorization");
  }
  if (!authToken) {
    return { pubsub };
  }
  const token = authToken.split(" ")[1];
  if (!token || token === "") {
    return { pubsub };
  }
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, process.env.CREDENTIALS_JWT);
  } catch (err) {
    return { pubsub };
  }
  if (!decodedToken) {
    return { pubsub };
  }

  const { userId } = decodedToken;

  return { token, userId, pubsub };
};

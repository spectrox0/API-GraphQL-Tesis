const jwt = require("jsonwebtoken");
const { pubsub } = require("../graphql/resolvers/pubsub.js");

module.exports = ({ req, connection }) => {
  if (connection) {
    // check connection for metadata
    return { pubsub };
    return connection.context;
  }

  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.CREDENTIALS_JWT);
  } catch (err) {
    return;
  }
  if (!decodedToken) {
    return;
  }
  const { userId } = decodedToken;

  return { token, userId, pubsub };
};

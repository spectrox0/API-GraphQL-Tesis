const jwt = require("jsonwebtoken");

module.exports = ({ req, connection }) => {
  const authHeader = req.get("Authorization");
  if (connection) {
    // check connection for metadata
    return connection.context;
  }

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
  const userId = decodedToken.userId;
  return { token, userId };
};

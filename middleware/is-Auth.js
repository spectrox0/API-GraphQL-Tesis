const jwt = require("jsonwebtoken");

module.exports = async ({ req, connection }) => {
  let authToken;

  if (connection) {
    authToken = connection.context.authToken;
    if (!authToken) return;
  } else {
    authToken = req.get("Authorization");
  }
  if (!authToken) {
    return;
  }
  const token = authToken.split(" ")[1];
  if (!token || token === "") {
    return;
  }
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, process.env.CREDENTIALS_JWT);
  } catch (err) {
    return;
  }
  if (!decodedToken) {
    return;
  }

  const { userId } = decodedToken;

  return { token, userId };
};

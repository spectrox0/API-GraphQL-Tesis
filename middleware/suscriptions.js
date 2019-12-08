const jwt = require("jsonwebtoken");

module.exports = {
  onConnect: async (connectionParams, webSocket) => {
    if (connectionParams.authToken) {
      try {
        const token = connectionParams.authToken;
        const decodedToken = jwt.verify(token, process.env.CREDENTIALS_JWT);
        if (decodedToken) {
          const { userId } = decodedToken;
          return { token, userId };
        }
      } catch (err) {
        throw new Error("Missing auth token!");
      }

      throw new Error("Missing auth token!");
    }
  }
};

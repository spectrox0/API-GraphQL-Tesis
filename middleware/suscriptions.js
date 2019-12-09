module.exports = {
  onConnect: async (connectionParams, webSocket) => {
    const { authToken } = connectionParams;
    return { authToken };
  }
};

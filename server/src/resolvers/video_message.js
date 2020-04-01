module.exports = {
  Query: {
    videoMessage: (_, { id }, { dataSources }) =>
      dataSources.videoMessageAPI.getVideoMessage({ messageId: id }),
  },
  Mutation: {
    draftVideoMessage: (_, { draft }, { dataSources }) =>
      dataSources.videoMessageAPI.draftVideoMessage({ draft }),

    sendVideoMessage: (_, { id }, { dataSources }) =>
      dataSources.videoMessageAPI.sendVideoMessage({ messageId: id }),
  }
};

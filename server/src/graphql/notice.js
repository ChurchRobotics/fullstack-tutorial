const gql = require('graphql-tag');

const typeDefs = gql`
    type GeneralResponse {
        success: Boolean!
        message: String
    }
    
    extend type Mutation {
        updateDeviceAlias(postArgs: PostSaveDeviceInput): GeneralResponse!
        sendNotices(userIds: [String!]!): GeneralResponse!
        deleteAlias(deleteArgs: DeleteAliasInput): GeneralResponse!
    }
    
    input PostSaveDeviceInput {
        userId: String!
        pushToken: String!
    }
    
    input DeleteAliasInput {
      alias: String!
      platform: [String]
    }
`;

function sendRequestResult(success, message) {
  return { success, message };
}

const resolvers = {
  Mutation: {
    updateDeviceAlias: async (_, { postArgs: { userId, pushToken } }, { dataSources }) => {
      await dataSources.noticeAPI.updateAlias(userId, pushToken);
      return sendRequestResult(true, 'success: save device info');
    },

    sendNotices: async (_, { userIds }, { dataSources }) => {
      return await dataSources.noticeAPI.sendNotices({ userIds });
    },

    deleteAlias: async (_, { deleteArgs: { alias, platform } }, { dataSources }) => {
      await dataSources.noticeAPI.deletePlatformAlias(alias, platform);
      return sendRequestResult(true, 'Cleared successfully!');
    },
  }
}

module.exports = {
  typeDefs,
  resolvers
}

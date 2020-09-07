const gql = require('graphql-tag');

const typeDefs = gql`
  extend type Mutation {
    sendVerificationCode(phoneNumber: String!): GeneralResponse! 
    userLogin(phoneNumber: String, verificationCode: String): authResponse!
  }
  
  type authResponse {
    success: String!
    message: String!
    authorization: String
  }
  
  type AuthResponse {
    authorization:String!
  }
  
  extend type User {
    phoneNumber: String
  }
`;

const resolvers = {
  Mutation: {
    sendVerificationCode: async (_, { phoneNumber }, { dataSources }) => {
      if (!/^1\d{10}/.test(phoneNumber)) return { success: true, message: '手机号格式不正确!' };
      await dataSources.authAPI.sendVerificationCode(phoneNumber);
      return { success: true, message: '成功发送!' }
    },

    userLogin: async (_, { phoneNumber, verificationCode }, { dataSources }) => {
      if (!/^1\d{10}/.test(phoneNumber)) return { success: true, message: '手机号格式不正确!' };
      if (!/\d{4}/.test(verificationCode)) return { success: true, message: '验证码格式不正确!' };
      return await dataSources.authAPI.login(phoneNumber, verificationCode);
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}

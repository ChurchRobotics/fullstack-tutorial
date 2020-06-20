const gql = require('graphql-tag');

const typeDefs = gql`
  extend type Query {
    videoMessage(id: ID!): VideoMessageType
  }

  type VideoMessageType {
    id: ID!
    sender: ID!
    recipient: ID!
    subject: String!
    cover: String!
    video: String!
    sentAt: String
    forBook: ID!
  }

  extend type Mutation {
    draftVideoMessage(draft: DraftVideoMessageInput!): DraftVideoMessageReply!
    sendVideoMessage(id: ID!): Boolean!
  }

  input DraftVideoMessageInput {
    recipient: ID!
    subject: String!
    forBook: ID!
  }

  type DraftVideoMessageReply {
    videoMessage: VideoMessageType!
    presignCover: String!
    presignVideo: String!
  }
`;

const resolvers = {
  Query: {
    videoMessage: (_, { id }, { dataSources }) => (
      dataSources.videoMessageAPI.getVideoMessage({ messageId: id })
    ),
  },
  Mutation: {
    draftVideoMessage: (_, { draft }, { dataSources }) => (
      dataSources.videoMessageAPI.draftVideoMessage({ draft })
    ),
    sendVideoMessage: (_, { id }, { dataSources }) => (
      dataSources.videoMessageAPI.sendVideoMessage({ messageId: id })
    ),
  }
};

module.exports = {
  typeDefs,
  resolvers,
};

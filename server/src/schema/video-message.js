const gql = require('graphql-tag');

module.exports = gql`
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

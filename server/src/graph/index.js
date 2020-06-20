const gql = require('graphql-tag');

const launch = require('./launch');
const user = require('./user');
const videoMessage = require('./video_message');
const booking = require('./booking');
const wallet = require('./wallet');

const _ = gql`
  scalar Date

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const typeDefs = [
  _,
  launch.typeDefs,
  user.typeDefs,
  videoMessage.typeDefs,
  booking.typeDefs,
  wallet.typeDefs,
];

const resolvers = [
  launch.resolvers,
  user.resolvers,
  videoMessage.resolvers,
  booking.resolvers,
  wallet.resolvers,
];

module.exports = {
  typeDefs,
  resolvers,
};

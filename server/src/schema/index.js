const gql = require('graphql-tag');

const launch = require('./launch');
const user = require('./user');
const videoMessage = require('./video_message');
const booking = require('./booking');

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

module.exports = [
  _,
  launch,
  user,
  videoMessage,
  booking,
];

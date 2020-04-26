const gql = require('graphql-tag');

const launch = require('./launch');
const user = require('./user');
const video_message = require('./video_message');

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
  video_message,
];

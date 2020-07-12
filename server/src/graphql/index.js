const gql = require('graphql-tag');

const modules = [
  require('./launch'),
  require('./user'),
  require('./video_message'),
  require('./booking'),
  require('./wallet'),
];

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
  ...modules.map(mod => mod.typeDefs)
];

const resolvers = (
  modules.map(mod => mod.resolvers)
);

module.exports = {
  typeDefs,
  resolvers,
};

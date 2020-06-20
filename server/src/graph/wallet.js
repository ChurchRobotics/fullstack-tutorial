const gql = require('graphql-tag');

const {
  USERS,
  WALLETS,
  DRAWNS,
} = require('../static');

const typeDefs = gql`
  extend type User {
    wallet: Wallet!
  }

  type Wallet {
    id: ID!
    of: User!
    balance: Float!
    totalIncome: Float!
    drawn: [Draw!]!
  }

  type Draw {
    id: ID!
    amount: Float!
    to: String!
    status: DrawStatus!
    date: Date!
  }

  enum DrawStatus {
    DRAFT
    REQUESTED
    PROCESSING
    DONE
  }
`;

const resolvers = {
  User: {
    wallet: async (user, __, { dataSources }) => {
      // FIXME: don't use mock uid
      const uid = '1' || user.id;

      return (
        WALLETS.find(it => it.of === uid) || []
      );
    },
  },
  Wallet: {
    of: async (wallet, __, { dataSources }) => (
      USERS.find(it => it.id === wallet.of)
    ),
    drawn: async (wallet, __, { dataSources }) => (
      DRAWNS.filter(it => it.wallet === wallet.id)
    ),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

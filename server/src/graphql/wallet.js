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

  extend type Mutation {
    withdraw: WalletUpdateResponse!
  }

  type WalletUpdateResponse {
    success: Boolean!
    message: String
    wallet: Wallet!
  }
`;

const resolvers = {
  User: {
    wallet: async (user, __, { dataSources }) => {
      // FIXME: don't use mock uid
      const uid = '1' || user.id;

      // TODO: remove delay op
      await new Promise(done => setTimeout(done, 1000));

      return (
        WALLETS.find(it => it.of === uid) || {}
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
  Mutation: {
    withdraw: async (_, __, { context, dataSources }) => {
      // FIXME: don't use mock uid
      const uid = '1' || user.id;

      const wallet = WALLETS.find(it => it.of === uid);

      // TODO: remove delay op
      await new Promise(done => setTimeout(done, 1000));

      if (wallet.balance > 0) {
        DRAWNS.push({
          id: '3',
          wallet: wallet.id,
          amount: wallet.balance,
          to: 'ti@alipay.com',
          status: 'PROCESSING',
          date: 155.32,
        });

        wallet.balance = 0;
      }

      return {
        success: true,
        message: 'withdraw request submit successfully',
        wallet,
      };
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

const gql = require('graphql-tag');

const typeDefs = gql`
  extend type User {
    receivedBookings: [Booking!]!
  }

  type Booking {
    id: ID!
    from: String!
    to: String!
    message: String!
    talent: User!
    by: User!
    due: Date!
    price: Float!
  }
`;

const resolvers = {
  User: {
    receivedBookings: async (user, __, { dataSources }) => {
      // FIXME: don't use mock uid
      const uid = '1' || user.id;

      return (
        dataSources.bookingAPI.findBookingsByTalent({
          talent: uid,
        }) || []
      );
    },
  },
  Booking: {
    talent: async (booking, __, { dataSources }) => (
      dataSources.bookingAPI.findOrCreateUser({ uid: booking.talent })
    ),
    by: async (booking, __, { dataSources }) => (
      dataSources.bookingAPI.findOrCreateUser({ uid: booking.by })
    ),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

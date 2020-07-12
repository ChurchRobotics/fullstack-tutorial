const gql = require('graphql-tag');

const typeDefs = gql`
  extend type User {
    receivedBookings(filter: BookingStatus): [Booking!]!
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
    status: BookingStatus!
    date: Date!
  }

  enum BookingStatus {
    DRAFT
    BOOKED
    WAITING_REVIEW
    DONE
    CANCELED
  }
`;

const resolvers = {
  User: {
    receivedBookings: async (user, { filter }, { dataSources }) => {
      // FIXME: don't use mock uid
      const uid = '1' || user.id;

      // TODO: remove delay op
      await new Promise(done => setTimeout(done, 1000));

      return (
        dataSources.bookingAPI.findBookingsByTalent({
          talent: uid,
          filter,
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

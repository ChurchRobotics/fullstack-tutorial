module.exports = {
  Booking: {
    talent: async (booking, __, { dataSources }) => (
      dataSources.bookingAPI.findOrCreateUser({ uid: booking.talent })
    ),
    by: async (booking, __, { dataSources }) => (
      dataSources.bookingAPI.findOrCreateUser({ uid: booking.by })
    ),
  },
};

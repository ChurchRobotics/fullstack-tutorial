module.exports = {
  Query: {
    me: async (_, __, { dataSources }) => (
      dataSources.userAPI.findOrCreateUser()
    ),
  },
  User: {
    receivedBookings: async (user, __, { dataSources }) => {
      const talent = '1' || user.id;

      return (
        dataSources.bookingAPI.findBookingsByTalent({
          talent,
        }) || []
      );
    },
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) => (
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })
    ),
  },
  Mutation: {
    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      });

      return {
        success: results && results.length === launchIds.length,
        message:
          results.length === launchIds.length
            ? 'trips booked successfully'
            : `the following launches couldn't be booked: ${launchIds.filter(
              id => !results.includes(id),
            )}`,
        launches,
      };
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = dataSources.userAPI.cancelTrip({ launchId });

      if (!result)
        return {
          success: false,
          message: 'failed to cancel trip',
        };

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: 'trip cancelled',
        launches: [launch],
      };
    },
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer(email).toString('base64');
    },
    uploadProfileImage: async (_, { file }, { dataSources }) => (
      dataSources.userAPI.uploadProfileImage({ file })
    ),
  },
};

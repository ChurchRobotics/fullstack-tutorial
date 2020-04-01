const LaunchAPI = require('./launch-api');
const UserAPI = require('./user-api');
const VideoMessageAPI = require('./video_message');

// creates a sequelize connection once. NOT for every request
const store = require('./store')();

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
  videoMessageAPI: new VideoMessageAPI(),
});

module.exports = {
  LaunchAPI,
  UserAPI,
  VideoMessageAPI,
  store,
  dataSources,
};

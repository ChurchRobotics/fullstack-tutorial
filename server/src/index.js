require('dotenv').config();

const { ApolloServer } = require('apollo-server-koa');
const isEmail = require('isemail');

const {
  typeDefs,
  resolvers,
} = require('./modules');

const {
  LaunchAPI,
  UserAPI,
  VideoMessageAPI,
  BookingAPI,
} = require('./datasources');

const Koa = require('koa');
const app = new Koa();

// creates a sequelize connection once. NOT for every request
const store = require('./store')();

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
  videoMessageAPI: new VideoMessageAPI(),
  bookingAPI: new BookingAPI(),
});

// set up the global context for each resolver, using the req
const context = async ({ ctx }) => {
  // simple auth check on every request
  const { request: req } = ctx;
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

server.applyMiddleware({ app });

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  VideoMessageAPI,
  BookingAPI,
  store,
  server,
};

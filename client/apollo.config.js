module.exports = {
  client: {
    includes: ['./src/**/*.{ts,tsx}'],
    service: {
      url: 'http://localhost:4000/graphql',
      name: 'fullstack-tutorial',
    },
  }
};
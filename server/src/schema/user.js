const gql = require('graphql-tag');

module.exports = gql`
  extend type Query {
    me: User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token

    # for use with the iOS tutorial
    uploadProfileImage(file: Upload!): User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  extend type Launch {
    isBooked: Boolean!
  }

  type User {
    id: ID!
    email: String!
    profileImage: String
    trips: [Launch]!
  }
`;
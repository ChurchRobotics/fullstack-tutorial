const gql = require('graphql-tag');

module.exports = gql`
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

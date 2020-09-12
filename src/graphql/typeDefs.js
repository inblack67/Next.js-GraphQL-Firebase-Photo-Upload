import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

type Photo {
  url: String,
  createdAt: String,
}

type Query {
  uploads: [Photo]!,
}

type Mutation {
  singleUpload(file: Upload!): String!
}
`;
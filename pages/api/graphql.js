import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../src/graphql/typeDefs';
import { resolvers } from '../../src/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
})

const handler = server.createHandler({
  path: '/api/graphql'
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler;
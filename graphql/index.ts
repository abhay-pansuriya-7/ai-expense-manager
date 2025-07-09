import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema';
import { resolvers } from './resolver';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
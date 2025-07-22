import UserResolvers from './User';
import CategoryResolver from './Category';
// import { ProductResolvers } from './Product';

// Merge resolvers
export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...CategoryResolver.Query,
    // ...ProductResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...CategoryResolver.Mutation,
    // ...ProductResolvers.Mutation,
  },
};
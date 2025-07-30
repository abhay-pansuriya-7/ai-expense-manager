import UserResolvers from './User';
import CategoryResolver from './Category';
import TransactionResolver from './Transaction';
// import { ProductResolvers } from './Product';

// Merge resolvers
export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...CategoryResolver.Query,
    ...TransactionResolver.Query,
    // ...ProductResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...CategoryResolver.Mutation,
    ...TransactionResolver.Mutation,
    // ...ProductResolvers.Mutation,
  },
};
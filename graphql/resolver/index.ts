import  UserResolvers  from './User';
// import { ProductResolvers } from './Product';

// Merge resolvers
export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    // ...ProductResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    // ...ProductResolvers.Mutation,
  },
};
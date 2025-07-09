import  User  from './User';
// import { ProductTypeDefs } from './Product';

// Base schema that includes shared types, enums, interfaces, etc.
const baseTypeDefs = `
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [
  baseTypeDefs,
  User,
//   ProductTypeDefs
];
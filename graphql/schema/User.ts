const UserSchema = `
   type User {
    id: String
    name: String
    email: String
    age: Int
    isAdmin: Boolean
  }

  type CommonResponse {
    status: Boolean!
    message: String!
    data: User
    token: String
  }


  input UserInput {
    fname: String!
    email: String!
    age: Int!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User]!
    user(id: String!): User
  }

  type Mutation {    
    updateUser(id: String!, input: UserInput): User
    deleteUser(id: String!): User
  }
`;

export default UserSchema;  
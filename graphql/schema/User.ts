const UserSchema = `


  type SubAccount {
    id: String
    name: String
    balance: Boolean
    description: String
    createdAt: String
    updatedAt: String
  }

  type UserAccounts{
    id: String
    type: String
    isActive: Boolean
    subAccounts: [SubAccount]
    createdAt: String
    updatedAt: String
  }

   type User {
    id: String
    name: String
    email: String
    image: String
    theme: String
    colorTheme: String
    userAccounts:UserAccounts
  }

  type UserResponse {
    status: Boolean!
    message: String!
    data: User
  }

  type CommonResponse {
    status: Boolean!
    message: String!    
  }


  input UserInput {
    name: String
    email: String
    image: String
    theme: String
    colorTheme: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {    
    getUser: UserResponse
  }

  type Mutation {    
    updateUser(id: String!, input: UserInput): UserResponse
    deleteUser(id: String!): CommonResponse
  }
`;

export default UserSchema;  
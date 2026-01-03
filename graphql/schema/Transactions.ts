const TransactionSchema = `
 
enum TransactionType {
    EXPENSE
    INCOME
    TRANSFER
}

input RecurringDataInput {
    name: String!    
    frequency: String!
    interval: Int!
    startDate: String!
    endDate: String
}

input TransactionInput {
    id: String    
    amount: Float!
    description: String!
    date: String!
    type: TransactionType!
    categoryId: String!       
    recurringItemId: String!
    isRecurring: Boolean!
    attachments: [String]
    recurringData: RecurringDataInput
}

type TransactionResponse {
    id: String
    userId: String
    amount: Float
    description: String
    date: String
    type: TransactionType
    categoryId: String
    subAccountId:String
    isRecurring: Boolean
    recurringItemId: String
    notes:String
    attachments: [String]
    createdAt: String
    updatedAt: String
}

type MultipleTransactionResponse {
    status: Boolean!
    message: String!
    data: [TransactionResponse]
    pagination: PaginationInfo
}

type singleTransactionResponse {
    status: Boolean!
    message: String!
    data: TransactionResponse
}

type Query {
    getAllTransactions(
        page: Int = 1
        limit: Int = 10
        search: String
        sortBy: String = "name"
        sortOrder: String = "asc"
        type: TransactionType
    ): MultipleTransactionResponse
    getTransaction(id: String!): singleTransactionResponse
}

type Mutation {
    addTransaction(input: TransactionInput): singleTransactionResponse
    updateTransaction(id: String!, input: TransactionInput!): CommonResponse
    deleteTransaction(id: String!): CommonResponse
}
`;

export default TransactionSchema;  
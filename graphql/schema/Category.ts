const CategorySchema = `
 
enum CategoryType {
    EXPENSE
    INCOME
    TRANSFER
}

type Category {
    id: String
    name: String
    type:CategoryType
    description: String
    color: String
    icon: String
    expenseLimit: Float
}

input CategoryInput {
    name: String
    type:CategoryType
    description: String
    color: String
    icon: String
    expenseLimit: Float
}

type PaginationInfo {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
}

type CategoryResponse {
    status: Boolean!
    message: String!
    data: [Category]
    pagination: PaginationInfo
}

type SingleCategoryResponse{
    status:Boolean!
    message: String!
    data: Category
}

type Query {
    getAllCategories(
        page: Int = 1
        limit: Int = 10
        search: String
        sortBy: String = "name"
        sortOrder: String = "asc"
        type: CategoryType
    ): CategoryResponse
    getCategory(id: String!): SingleCategoryResponse
}

type Mutation {
    createCategory(input: CategoryInput): SingleCategoryResponse
    updateCategory(id: String!, input: CategoryInput!): CommonResponse
    deleteCategory(id: String!): CommonResponse
}
`;

export default CategorySchema;  
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

type CategoryResponse {
    status: Boolean!
    message: String!
    data: [Category]
}

type SingleCategoryResponse{
    status:Boolean!
    message: String!
    data: Category
}

type Query {
    getAllCategories: CategoryResponse
    getCategory(id: String!): SingleCategoryResponse
}

type Mutation {
    createCategory(input: CategoryInput): SingleCategoryResponse
    updateCategory(id: String!, input: CategoryInput!): CommonResponse
    deleteCategory(id: String!): CommonResponse
}
`;

export default CategorySchema;  
export default `#graphql
    type Query {
        categories: [Category]
        getCategoryById(id: ID!): Category
    }

    type Mutation {
        createCategory(data:CategoryInputData!): GeneralResponse
        updateCategoryById(id:ID!, data: CategoryInputData!): GeneralResponse
        deleteCategoryById(id: ID!): GeneralResponse
    }

    input CategoryInputData {
        name: String!
        description: String
        imageUrl: String
    }

    type Category {
        _id: ID
        name: String!
        description: String
        imageUrl: String
    }
`;
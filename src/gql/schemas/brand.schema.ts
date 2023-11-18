export default `#graphql
    type Query {
        brands: [Brand]
        getBrandById(id:ID!): Brand
    }

    type Mutation {
        createBrand(data:BrandInputData!): GeneralResponse
        updateBrandById(id:ID!, data: BrandUpdateInputData!): GeneralResponse
        deleteBrandById(id: ID!): GeneralResponse
    }

    input BrandInputData {
        name: String!
        description: String
        email: String!
        phone: String
        website: String
        location: String
    }

    input BrandUpdateInputData {
        name: String!
        description: String
        email: String!
        phone: String
        website: String
        status: String
        location: String
    }


    type Brand {
        _id: ID
        name: String!
        description: String
        email: String
        phone: String
        website: String
        status: String
        location: String
    }

`
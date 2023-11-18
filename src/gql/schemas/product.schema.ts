
export default `#graphql
    extend type Query {
        getProducts(page:Int, size:Int, search:String, filteredBy: FilteredData): productsResponse
        getProductsByCategory(category: String!): [Product]
        getProductsWithDetails(page:Int, size:Int): [Product]
        productWithDetailsById(id: ID!): Product
    }

    extend type Mutation {
        createProduct(data: ProductInputData!): ProductGeneralResponse
        updateProductQuantity(id:ID!, data: ProductQuantityUpdateInfo!): GeneralResponse
        deleteProductById(id: ID!): GeneralResponse
        updateProductById(id:ID!, data: ProductUpdateInputData!): ProductGeneralResponse
    }

    input ProductInputData {
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        discount: Int
        quantity: Int
        status: String
        category: CategoryInputRef
        brand: BrandInputRef
    }

    input ProductUpdateInputData {
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        discount: Int
        quantity: Int
        sellCount: Int
        status: String
        category: CategoryInputRef
        brand: BrandInputRef
        rating: Int
        isTopSale: Boolean
    }

    input ProductQuantityUpdateInfo { 
        reference: String!
    }

    type ProductGeneralResponse {
        status: Boolean!
        message: String!
        product: Product
    }

    type productsResponse {
        products: [Product]
        totalProductsCount: Int
    }

    type Product {
        _id: ID
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        discount: Int
        quantity: Int
        status: String
        sellCount: Int
        category: CategoryRef
        brand: BrandRef
        rating: Int
        isTopSale: Boolean
    }


    input FilteredData {
        brand: String
        category: String
        price: Int
        rating: Int
    }
`
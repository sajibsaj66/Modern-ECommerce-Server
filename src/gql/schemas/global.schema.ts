export default `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    booksByName(author: String): Book
  }
  

  type GeneralResponse {
    status: Boolean!
    message: String!
  }

  type BrandRef {
    id: Brand
    name: String
  }

  input BrandInputRef {
    id: ID
    name: String
  }

  type CategoryRef {
    id: Category
    name: String
  }

  input CategoryInputRef {
    id: ID
    name: String
  }
`
import adminSchema from "./admin.schema";
import globalSchema from "./global.schema";
import userSchema from "./user.schema";
import brandSchema from "./brand.schema";
import categorySchema from "./category.schema";
import productSchema from "./product.schema";
import orderSchema from "./order.schema";

const rootSchema = `#graphql
    type Query {
        _:Boolean
    }
    type Mutation {
        _:Boolean
    }
`;

export default [
    rootSchema,
    adminSchema,
    globalSchema,
    userSchema,
    brandSchema,
    categorySchema,
    productSchema,
    orderSchema
];
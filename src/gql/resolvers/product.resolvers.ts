import { createProductService, getProductsService, getProductsWithDetailsService } from "../services/stock.services";
import { checkAdminService } from "../services/admin.services";
import Product from "../../database/models/Product";

export type ContextTypes = {
    email: string;
    role?: string;
}

export type ProductType = {
    data: {
        name: string;
        description: string;
        unit: string;
        imageUrl: string;
        price: Number;
        discount: Number;
        quantity: Number;
        status: string;
        category: {
            name: string;
            id: string;
        };
        brand: {
            name: string;
            id: string;
        }
    }
}

type productsType = {
    page: number;
    size: number;
    search: string;
    filteredBy: {
        brand: string;
        category: string;
        price: number;
        rating: number;
    };
};

const stockResolver = {
    Query: {
        ////------>>> Get All Products <<<--------////
        getProducts: async (_: any, { page, size, search, filteredBy }: productsType) => {
            const products = await getProductsService({ filteredBy, page, size, search })
            return products;
        },

        ////------>>> get products by category <<<--------////
        getProductsByCategory: async (_: any, { category }: { category: string }) => {
            const products = await Product.find({ 'category.name': category })
            return products;
        },

        ////------>>> find all products with details for admin <<<--------////
        getProductsWithDetails: async (_: any, { page, size }: { page: number, size: number }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            const products = await getProductsWithDetailsService({ page, size })
            return products;
        },

        ////------>>> Get a product with details by id <<<--------////
        productWithDetailsById: async (_: any, { id }: { id: string }) => {
            const product = await Product.findOne({ _id: id })
                .populate('category.id')
                .populate('brand.id');
            return product;
        }

    },

    Mutation: {
        ////------>>> Create a New Product <<<--------////
        createProduct: async (_: any, { data }: ProductType, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // is product already exist?
            const isExistProduct = await Product.findOne({ name: data.name, 'brand.name': data.brand.name })
            if (isExistProduct) throw new Error("The Product already exist");

            // creating product
            const product = await createProductService(data)
            if (!product) throw new Error("Failed to Create a product.")

            return {
                status: true,
                message: 'The product has been created successfully',
                product: product
            }
        },


        ////------>>> Update product Quantity <<<--------////
        updateProductQuantity: async (_: any, { id, data }: { id: string; data: { reference: string; } }) => {
            // update product quantity
            if (data.reference === 'increase') {
                const product = await Product.findOne({ _id: id })
                if (!product) throw new Error("Failed to find product")
                product.quantity = product.quantity + 1
                product.sellCount = product.sellCount - 1
                await product.save()
            } else {
                const product = await Product.findOne({ _id: id })
                if (!product) throw new Error("Failed to find product")
                product.quantity = product.quantity - 1
                product.sellCount = product.sellCount + 1
                await product.save()
            }

            return {
                status: true,
                message: 'The product has updated successfully',
            }
        },


        ////------>>> Delete a product by id <<<--------////
        deleteProductById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // deleting product
            const product = await Product.findByIdAndDelete(id)
            if (!product) throw new Error("Failed to Delete a product.")

            return {
                status: true,
                message: 'The product has been deleted successfully',
            }
        },


        ////------>>> Update a product by id <<<--------////
        updateProductById: async (_: any, args: any, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // updating product
            const product = await Product.findOneAndUpdate({ _id: args.id }, args.data)
            if (!product) throw new Error("Failed to Update the product.")

            return {
                status: true,
                message: 'The product has been updated successfully'
            };
        }
    }
};

export default stockResolver;
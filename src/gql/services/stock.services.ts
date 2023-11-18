import { ObjectId } from "mongodb";
import Product from "../../database/models/Product";

export type ProductServiceType = {
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

type getProductsServiceTypes = {
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


// create product service
export const createProductService = async (data: ProductServiceType) => {
    const product = await Product.create({
        name: data.name,
        description: data.description,
        unit: data.unit,
        imageUrl: data.imageUrl,
        price: data.price,
        discount: data.discount,
        quantity: data.quantity,
        status: data.status,
        category: {
            name: data.category.name,
            id: new ObjectId(data.category.id)
        },
        brand: {
            name: data.brand.name,
            id: new ObjectId(data.brand.id)
        }
    })

    return product;
};


// find all products service
export const getProductsService = async ({ page, size, search, filteredBy }: getProductsServiceTypes) => {
    try {
        let filteredObj = {};
        for (const key in filteredBy) {
            if ((key == "brand") && (filteredBy[key] != "")) filteredObj[`${key}.name`] = filteredBy[key]
            else if ((key == "category") && (filteredBy[key] != "")) filteredObj[`${key}.name`] = filteredBy[key]
            else if ((key == "price") && (filteredBy[key] != -1)) filteredObj[key] = { $gt: filteredBy[key] }
            else if ((key == "rating") && (filteredBy[key] != -1)) filteredObj[key] = filteredBy[key]
        };


        const query = search ? { name: { $regex: search, $options: 'i' } } : filteredObj;
        const products = await Product.find(query).skip(page * size).limit(size);
        const productsCount = await Product.find(query).countDocuments();

        return {
            products,
            totalProductsCount: productsCount
        };
    } catch (error) {
        console.log(error);
    };
};


// find all products with details service
export const getProductsWithDetailsService = async ({ page, size }: { page: number; size: number }) => {
    const products = await Product.find()
        .skip(page * size)
        .limit(size)
        .populate('brand.id')
        .populate('category.id');

    return products;
};
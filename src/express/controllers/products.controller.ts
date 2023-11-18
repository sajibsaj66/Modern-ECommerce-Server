import { Request, Response } from "express";
import Product from "../../database/models/Product";

// products count
export const productsCountController = async (req: Request, res: Response) => {
    const totalProducts = await Product.find().estimatedDocumentCount()
    if (!totalProducts) return res.status(400).json({ status: false, message: 'Failed to fetch product count' })

    res.json({
        status: true,
        totalDocuments: totalProducts
    });
};
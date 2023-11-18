import Brand from "../../database/models/Brand";
import { checkAdminService } from "../services/admin.services";

export type ContextTypes = {
    email: string;
    role?: string;
}

interface BrandType {
    name: string;
    description?: string;
    email: string;
    phone?: string;
    website?: string;
    location?: string;
    status?: string;
};

const brandResolver = {
    Query: {
        ////------>>> get all brands <<<--------////
        brands: async (_: any, args: any, context: ContextTypes) => {
            const _brands = await Brand.find();
            return _brands
        },

        ////------>>> get a brand using id <<<--------////
        getBrandById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // getting from database
            const _brand = await Brand.findOne({ _id: id });
            return _brand;
        }
    },

    Mutation: {
        ////------>>> create a brand <<<--------////
        createBrand: async (_: any, { data }: { data: BrandType }, context: ContextTypes) => {
            const { name, description, email, phone, website, location, } = data;

            // checking admin authentication
            checkAdminService(context.role);

            // creating the brand
            const _brand = new Brand({
                name,
                description,
                email,
                phone,
                website,
                location
            });

            await _brand.save();

            return {
                status: true,
                message: 'The Brand has been created successfully!'
            };
        },


        ////------>>> Update a brand by id <<<--------////
        updateBrandById: async (_: any, args: { id: string; data: BrandType }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // updating brand
            const brand = await Brand.findOneAndUpdate({ _id: args.id }, args.data)
            if (!brand) throw new Error("Failed to Update the brand.")

            return {
                status: true,
                message: 'The brand has been updated successfully'
            };
        },


        ////------>>> Delete a brand by id <<<--------////
        deleteBrandById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // deleting brand
            const brand = await Brand.findByIdAndDelete(id)
            if (!brand) throw new Error("Failed to Delete the brand.")

            return {
                status: true,
                message: 'The brand has been deleted successfully',
            }
        },
    }
};

export default brandResolver;
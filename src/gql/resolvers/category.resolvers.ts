import Category from "../../database/models/Category";
import { checkAdminService } from "../services/admin.services";


interface CategoryType {
    name: string;
    imageUrl: string;
    description?: string;
};

export type ContextTypes = {
    email: string;
    role?: string;
}

const categoryResolver = {
    Query: {
        ////------>>> Get All Categories <<<--------////
        categories: async (_: any, args: any) => {
            // getting from database
            const _categories = await Category.find();
            return _categories;
        },

        ////------>>> Get a category by Id <<<--------////
        getCategoryById: async (_: any, { id }: { id: string }) => {
            const category = await Category.findOne({ _id: id })
            return category;
        }
    },

    Mutation: {
        ////------>>> create a category <<<--------////
        createCategory: async (_: any, { data }: { data: CategoryType }, context: ContextTypes) => {
            const { name, description, imageUrl } = data;

            // checking admin authentication
            checkAdminService(context.role);

            // creating the category
            const _category = new Category({
                name,
                description,
                imageUrl
            });

            await _category.save();

            return {
                status: true,
                message: 'The Category has been created successfully!'
            };
        },



        ////------>>> Update a category by id <<<--------////
        updateCategoryById: async (_: any, args: { id: string; data: CategoryType }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // updating category
            const category = await Category.findOneAndUpdate({ _id: args.id }, args.data)
            if (!category) throw new Error("Failed to Update the category.")

            return {
                status: true,
                message: 'The category has been updated successfully'
            };
        },



        ////------>>> Delete a category by id <<<--------////
        deleteCategoryById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // deleting category
            const category = await Category.findByIdAndDelete(id)
            if (!category) throw new Error("Failed to Delete the category.")

            return {
                status: true,
                message: 'The category has been deleted successfully',
            }
        },
    }
};

export default categoryResolver;
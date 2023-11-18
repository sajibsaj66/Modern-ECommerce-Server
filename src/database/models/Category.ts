import { Document } from "mongodb";
import { Schema, model } from "mongoose"

interface CategorySchemaType extends Document {
    name: string;
    description: string;
}


const categorySchema = new Schema<CategorySchemaType>({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        maxLength: [50, "Please provide a category name"],
        unique: true,
        lowercase: true
    },
    imageUrl: String,
    description: String
}, { timestamps: true })



export default model<CategorySchemaType>("Category", categorySchema)
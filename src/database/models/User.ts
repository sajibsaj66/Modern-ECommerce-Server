import { Document, model, Schema } from "mongoose";
import validator from "validator";


interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
    image: string;
    phone: string;
    role: string;
    gender: string;
    currentAddress: string;
    permanentAddress: string;
    dateOfBirth: string;
    authToken: string;
    accountStatus: string;
    darkMode: boolean;
}

const userSchema = new Schema<UserSchemaType>({
    name: {
        type: String,
        required: [true, "Please add your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        validate: [validator.isEmail, "Please add a valid email"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, "Please add a valid phone number"],
    },
    image: {
        type: String,
        default: "empty-avatar.jpg"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'N/A'],
        default: 'N/A'
    },
    currentAddress: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    permanentAddress: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    dateOfBirth: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    authToken: {
        type: String
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    darkMode: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


export default model<UserSchemaType>('User', userSchema);
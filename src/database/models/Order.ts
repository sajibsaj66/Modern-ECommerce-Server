import { Document, Schema, model } from "mongoose";


interface ItemsType {
    stockId: any,
    qty: number,
    price: number,
    name: string,
    imageUrl: string,
}

export interface OrderType extends Document {
    userId: any;
    items: ItemsType[];
    email: string;
    phone: string;
    address: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    orderStatus: string;
    orderDate: Date;
};

const orderSchema = new Schema<OrderType>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [{
        stockId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        qty: Number,
        price: Number,
        name: String,
        imageUrl: String,
    }],
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },
    trxId: {
        type: String,
        default: ""
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "delivered", "cancelled"],
        default: "pending"
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

export default model<OrderType>("Order", orderSchema);
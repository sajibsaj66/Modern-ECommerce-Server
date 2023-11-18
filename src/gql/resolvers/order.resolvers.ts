import Order from "../../database/models/Order";
import Product from "../../database/models/Product";
import User from "../../database/models/User";
import { checkAdminService } from "../services/admin.services";
import { ObjectId } from "mongodb"


export type ContextTypes = {
    email: string;
    role?: string;
}

interface ItemsType {
    stockId: any,
    qty: number,
    price: number,
    name: string,
    imageUrl: string,
}

interface OrderType {
    userId: string;
    items: ItemsType[];
    email: string;
    phone: string;
    address: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    orderStatus: string;
};

const orderResolver = {
    Query: {
        ////------>>> get all orders <<<--------////
        orders: async (_: any, args: any, context: { email: string; role: string; }) => {
            // checking admin authentication
            checkAdminService(context.role);

            // getting from database
            const orders = await Order.find()
                .populate('userId')
                .populate('items.stockId');
            return orders;
        },


        ////------>>> get all orders of a specific customer <<<--------////
        getOrdersByCustomerId: async (_: any, args: any, context: { email: string; role: string; }) => {
            // finding user from database
            const user = await User.findOne({ email: context.email })
            if (!user) throw Error("User Not Found.")

            // getting from database
            const orders = await Order.find({ userId: user._id })
                .populate('userId')
                .populate('items.stockId');

            return orders;
        },
    },

    Mutation: {
        ////------>>> create an order <<<--------////
        createOrder: async (_: any, { data }: { data: OrderType }, context: { email: string; role: string; }) => {
            const { userId, items, email, phone, address, amount, } = data;

            const user = await User.find({ email: context.email })
            if (!user) throw new Error("authorized user");

            // update product's sell quantity and stock quantity
            items.forEach(async (item) => {
                const product = await Product.findOne({ _id: item.stockId });
                if (!product) throw new Error("Failed to find product");
                product.quantity = product.quantity - 1;
                product.sellCount = product.sellCount + 1;
                await product.save();
            });

            // creating the order
            const order = new Order({
                userId: new ObjectId(userId),
                items: items,
                email,
                phone,
                address,
                amount,
            });

            await order.save();

            return {
                status: true,
                message: 'The Order has been created successfully!'
            };
        },

        ////------>>> Delete an order by id <<<--------////
        deleteOrderById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // deleting order
            const order = await Order.findByIdAndDelete(id)
            if (!order) throw new Error("Failed to Delete the order.")

            return {
                status: true,
                message: 'The order has been deleted successfully',
            }
        },
    }
};

export default orderResolver;
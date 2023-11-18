import User from "../../database/models/User";
import { checkAdminService } from "../services/admin.services";

type ContextType = {
    email: string;
    role: string;
}
const adminResolver = {
    Query: {
        getAllUsers: async (_: any, args: any, context: ContextType) => {
            checkAdminService(context.role)

            const users = await User.find();
            return users
        },
    },
};

export default adminResolver;
import User from "../../database/models/User"
import sendEmail from "../../middlewares/sendMail";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type ContextType = {
    email: string;
    role: string;
}

interface UserType {
    name: string;
    email: string;
    password: string;
    phone: string;
}

type OwnerUpdateInputType = {
    name: string;
    phone: string;
    gender: string;
    currentAddress: string;
    permanentAddress: string;
    dateOfBirth: string;
}

const userResolver = {
    Query: {
        ////------>>> get owner info using the ida <<<--------////
        ownerInfo: async (_: any, args: any, context: { email: string, role: string }) => {
            const { email } = context;
            const ownerData = await User.findOne({ email })
            return ownerData
        }
    },

    Mutation: {
        ////------>>> user signup <<<--------////
        signUpUser: async (_: any, { data }: { data: UserType }, context: any) => {
            const { name, email, password, phone } = data;

            // hashing password
            const hashedPassword = await bcrypt.hash(password, 10);

            // generating token
            const token = jwt.sign({ email }, process.env.SECRET_KEY);

            // create user
            const _user = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                authToken: token
            });
            await _user.save()

            // sending mail
            sendEmail(data.email, token)

            return {
                status: true,
                message: 'Signup has been successful!'
            };
        },

        ////------>>> user login <<<--------////
        loginUser: async (_: any, { data }: { data: UserType }, context: any) => {
            const { email, password } = data;

            if (!email || !password) {
                throw new Error('credentials are required');
            }

            // checking user existence
            const _user = await User.findOne({ email })
            if (!_user) throw new Error('Invalid Credentials');

            // verifying password
            const isPasswordMatch = await bcrypt.compare(password, _user.password);
            if (!isPasswordMatch) throw new Error('Invalid Credentials');

            // generating token
            const token = jwt.sign({ email, role: _user.role }, process.env.SECRET_KEY);

            return {
                status: true,
                message: 'Successfully logged in',
                token,
                user: _user
            };
        },



        ////------>>> Update Owner Information <<<--------////
        updateOwnerInfo: async (_: any, args: { email: string; data: OwnerUpdateInputType }, context: ContextType) => {
            const { name, phone, gender, currentAddress, permanentAddress, dateOfBirth } = args.data;

            // updating Owner Info
            const owner = await User.findOneAndUpdate(
                { email: context.email },
                {
                    $set: {
                        name,
                        phone,
                        gender,
                        currentAddress,
                        permanentAddress,
                        dateOfBirth,
                    }
                },
                { new: true }
            )
            if (!owner) throw new Error("Failed to Update Your Information.")

            return {
                status: true,
                message: 'Successfully updated',
                owner: owner
            };
        },
    }
};

export default userResolver;
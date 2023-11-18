import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../database/models/User"


const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) throw new Error("No token provided")

        var decoded: any = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) throw new Error("Failed to authenticate token")

        const user = await User.findOne({ email: decoded?.email }).select({ _id: 0, email: 1, role: 1 })
        if (!user) throw new Error("User not found")

        req.email = user?.email
        req.role = user?.role

        return next()
    } catch (error) {
        throw new Error(error as any)
    }
}

export default auth
import { connect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

// const MONGO_URI = `mongodb://localhost:27017/farm-management`
// const MONGO_URI = `mongodb://127.0.0.1:27017/modern-commerce-app`
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8xgxmx2.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`

// mongodb connection
connect(MONGO_URI)
    .then((): void => console.log('MongoDB Connected'))
    .catch((error): void => console.log(error));
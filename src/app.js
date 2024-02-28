import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// app.use middleware ke liye mostly use hota hai
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

//yaha par ham JSON data v accept kar rahe hai
app.use(express.json({ limit: '16kb' }))

//kuch request encodede v aaye ge jese [%name/user+id] jese
//extended : true ==>jab objects nested object ke form me aaye to uske liye extended use huaa hai
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// kayi baar image or pdf file ka request aaya orme usko store karna chata hoon to 'static' ka use karte hai..
app.use(express.static("public"));

app.use(cookieParser());


// router import
import userRouter from "./routes/user.routes.js"

// routers declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register


export { app }
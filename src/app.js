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


//mostly route ko uuper me hi import karte hai par yaha yaha par ham route ka segregate kar rahe hai. 
// router import
import userRouter from "./routes/user.routes.js"

// Import
//pehale ham app.get() use karte the Q ki ham yahi par uska routes banate the par avi ham routes ko import kar rahe hai so han app.use() likh rahe hai.ab sare routes and router use karsakte hai
// routers declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register


export { app }
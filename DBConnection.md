# (1) Following Steps are only used to make connections with MongoDB Atlas.

### Folder Structure:
```bash
      |src
      ├── db
      |    |----index.js
      |---index.js
      └── constants.js
      |── .env
      └── package.json
```

### constants.js

```javascript
export const DB_NAME = "databasekanaam";
```

### src/db/index.js

### index.js OR server.js

````javascript
// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js'

dotenv.config({
  path: './env'
})


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  })


// niche diye gaye tarike v hai jisse mongoDB ko connect kar sakte hai...
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// import express from "express"
// const app = express()

//   ; (async () => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

//       app.on("error", (error) => {
//         console.log("Error:", error);
//         throw error
//       })

//       app.listen(process.env.PORT, () => {
//         console.log(`App is listening on port ${process.env.PORT}`)
//       })

//     } catch (error) {
//       console.error("ERROR: ", error)
//       throw err

//       app

//     }
//   })()

## .env
```bash
PORT = 8000
MONGODB_URL = mongodb+srv://surajdevapp:M8sgddwjfuckRZifQuertregyyH@cluster6.6huurje9t.mongodb.net

CORS*ORIGIN=* // kahi se v request aaye koi matlab nahi to \_ ka use karte hai
````

## packeg.json

```json

"scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

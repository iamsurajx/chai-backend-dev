# (1) Following Steps are only used to make connections with MongoDB Atlas or Compass.

### Package.js
```json
{
  "name": "chai-backend",
  "version": "1.0.0",
  "description": "a backend at chai aur code Youtube channel",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["javascript", "backend", "chai"],
  "author": "Suraj Choudhary",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^3.1.0",
    "prettier": "^3.2.5"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cloudinary": "^2.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.0",
    "mongoose-aggregate-paginate-v2": "^1.0.7",
    "multer": "^1.4.5-lts.1"
  }
}
```


### Folder Structure:
```bash
root
  |---|src
  |     ├── db
  |     |    |--- index.js
  |     |--- index.js
  |     |--- constants.js
  |
  |── .env
  |--- package.json
```

### constants.js

```javascript
export const DB_NAME = "databasekanaam";
```

### src/db/index.js
```javascript
import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
```

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

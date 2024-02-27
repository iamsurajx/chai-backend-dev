#Following Steps are only to make connection with MongoDB Atlas.

##### Folder Structure:

      |src
      ├── db
      |    |----index.js
      |---index.js
      └── constants.js
      |── .env
      └── package.json

### constants.js
```javascript
export const DB_NAME = "databasekanaam"
```

### src/db/index.js


### index.js OR server.js

```javascript
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
path: './env'
})

; (() => {
connectDB()
})()
```

## .env
```
PORT = 8000
MONGODB_URL = mongodb+srv://surajdev:M81wjfuckRZifQutryH@cluster0.6hqfg9t.mongodb.net

CORS*ORIGIN=* // kahi se v request aaye koi matlab nahi to \_ ka use karte hai
```

## packeg.json
```json

"scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

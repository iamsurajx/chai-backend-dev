## How to upload file in backend | Multer

#### Install The following packages

```npm
  npm install cloudinary
  npm install multer
```

multer ke through hi cloudnary par file ko upload karte hai.

pehle localstorage par file rakhe ge
then localstorage se cloudinary/

#### Folder Structure

src
|
|--utils
| |----->cloudinary.js
|
|--middlewares
|---->multer.middleware.js

#### cloudinary.js

```javascript
// file system ka use karre ge
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "process.env.CLOUDINARY_CLOUD_NAME",
  api_key: "process.env.CLOUDINARY_API_KEY",
  api_secret: "process.env.CLOUDINARY_SECRET",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file is uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // removed the locally saved temporary file as the upload operation got failed
    return null;
  }
};

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);
```

#### multer.middleware.js

```javascript
import multer from "multer";

// multer ko as a middleware use karre ge.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../public/temp");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
```

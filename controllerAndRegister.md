user.controller.js

```javascript
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // ====================================================
  // step 1: get user details from frontend using (req.body)
  const { fullName, email, username, password } = req.body;
  console.log("email:", email);
  // ====================================================

  // ====================================================
  // step 2: validation not empty
  // if(fullName==""){
  //   throw new ApiError(400, "fullName is required")
  // }
  //                  OR
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  // ====================================================

  // ====================================================
  //step 3: check if user already exists: username, email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  // ====================================================

  //=====================================================
  // step 4:check for image, check for avatar

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files)
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  //=====================================================

  // ====================================================
  // step 5: upload them to cloudinary, avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Created Successfully..."));

  // ====================================================
});

export { registerUser };
```

user.routes.js

```javascript
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coveImage",
      maxCount: 1,
    },
  ])
);

export default router;
```

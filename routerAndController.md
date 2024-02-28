## setup router and controllers (5)

### Folder Structure

```bash
src
  |--->controllers
  |        |------>user.controllers.js
  |--->routes
          |----->user.routes.js
  |--->app.js
```

## user.controllers.js

```javascript
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

const signupUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Sign In Ok",
  });
});

export { registerUser, signupUser };
```

### user.routes.js

```javascript
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { signupUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/signin").post(signupUser);

export default router;
```

### app.js

```javascript
//mostly route ko uuper me hi import karte hai par yaha yaha par ham route ka segregate kar rahe hai.
// router import
import userRouter from "./routes/user.routes.js";

// Import
//pehale ham app.get() use karte the Q ki ham yahi par uska routes banate the par avi ham routes ko import kar rahe hai so han app.use() likh rahe hai.ab sare routes and router use karsakte hai
// routers declaration
app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register

export { app };
```

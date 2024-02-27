## Custom API Response And Error Handling

##### Folder Structure

```bash

utils
  |----> ApiError.js
  |----> ApiResponse.js
  |----> asyncHandler.js
```

### ApiError.js

```javascript
// API ke error ko handle karne me ye codes use hota hai.
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (this.stack) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
```

### ApiResponse.js

```javascript
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
```

### asyncHandler.js

```javascript
import { Promise } from "mongoose";

//production grade code promise se handle kiya jata hai.
const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => { }

// const asyncHandler = (func) => () => { }

// const asyncHandler = (func) => async () => { }

// try catch ke case me following jesa code likha jata hai...
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next)
//   } catch (error) {
//     // agar user error pass kar raha hai to err.code nahi to 500
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message
//     })
//   }
// }
```

import { Promise } from "mongoose"

//production grade code promise se handle kiya jata hai.
const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(err))
  }
}

export { asyncHandler }




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
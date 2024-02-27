// API ke error ko handle karne me ye codes use hota hai.
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.success = false;
    this.errors = errors

    if (this.stack) {
      this.stack = statck
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { ApiError }
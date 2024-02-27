import mongoose, { Schema } from "mongoose";
// jwt ik bearer tooken hai jo jo ye sahi bolta hai ham use maan lete hai.
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


// ====================User Schema===================
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video"
      }
    ],
    password: {
      type: String,
      required: [true, 'Password Is required']
    },
    refreshToken: {
      type: String
    }
  }, {
  timestamps: true
}
)
// ===================================================




//jab v data save hone ko jaye to userSchema.pre() run karwado jo ki ik async function hai ji ik next middleware pass karta hai
userSchema.pre("save", async function (next) {
  // agar password me koi modification nahi huaa hai to next() return kardega
  if (!this.isModified("password")) return next();

  //jab v method call hoga ya password modified hoga ye  code password ko increipt kar dega 
  this.password = bcrypt.hash(this.password, 10)
  next()
})

// custom methods (agar koi property nahi hoga to wo add ho jayega)
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}


// =======================jwt==========================

// generate access token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}



// refresh token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

// ========================
export const User = mongoose.model("User", userSchema);
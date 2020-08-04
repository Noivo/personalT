const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    default: ""
    //required: true,
    // unique: true,
    // trim: true,
    // minlength: 3
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("User", userSchema)

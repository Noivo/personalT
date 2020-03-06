const mongoose = require("mongoose")

const Schema = mongoose.Schema

const exerciseSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    idClient: {
      type: String,
      required: true
    },
    idUser: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Exercise", exerciseSchema)

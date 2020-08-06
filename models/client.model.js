const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  idUser: ObjectId,
})

module.exports = mongoose.model("Client", clientSchema)

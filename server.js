const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const path = require("path")

const users = require("./routes/api/users")
const clients = require("./routes/api/clients")
const exercises = require("./routes/api/exercises")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000
app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

app.use("/api/users", users)
app.use("/api/exercises", exercises)
app.use("/api/clients", clients)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const db = require("./config/keys").mongoURI
const MONGODB_URI = require("./config/keys").MONGODB_URI
mongoose.connect(MONGODB_URI || db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})

app.use(passport.initialize())
require("./config/passport")(passport)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

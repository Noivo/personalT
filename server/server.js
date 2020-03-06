const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")

const users = require("./routes/api/users")
const clients = require("./routes/api/clients")
const exercises = require("./routes/api/exercises")

require("dotenv").config()

const app = express()
const port = 5000
app.use(cors())

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

// DB config
const db = require("./config/keys").mongoURI
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})

app.use("/api/exercises", exercises)
app.use("/api/clients", clients)

// Passport middleware
app.use(passport.initialize())
// Passport config
require("./config/passport")(passport)
// Routes
app.use("/api/users", users)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

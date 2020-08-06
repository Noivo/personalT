const router = require("express").Router()
let Client = require("../../models/client.model")

router.route("/add").post((req, res) => {
  const newClient = new Client({
    name: req.body.name,
    idUser: req.body.idUser,
  })

  newClient
    .save()
    .then(() => res.json("Client added!"))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/").get((req, res) => {
  Client.find()
    .then((clients) => res.json(clients))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/:id").delete((req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(() => res.json("Client deleted."))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/:id").get((req, res) => {
  Client.findById(req.params.id)
    .then((client) => res.json(client))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/update/:id").put((req, res) => {
  Client.findByIdAndUpdate(req.params.id)
    .then((client) => {
      ;(client.name = req.body.name), (client.idUser = req.body.idUser)

      client
        .save()
        .then(() => res.json("Client updated!"))
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router

const routes = require("express").Router()

// controller
const controller = require("../controllers/users")

routes.post("/",controller.createUser);

module.exports = routes;
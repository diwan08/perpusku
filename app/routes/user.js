const routes = require("express").Router()
const authorize = require("../middlewares/authorize")


// controller
const controller = require("../controllers/users")

routes.get("/info",controller.getAll)
routes.get("/:id", authorize,controller.getdetail)

routes.post("/",controller.createUser);

module.exports = routes;
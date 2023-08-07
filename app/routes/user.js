const routes = require("express").Router()
const authorize = require("../middlewares/authorize")


// controller
const controller = require("../controllers/users")

routes.get("/:id", authorize,controller.getdetail)
routes.get("/",controller.getAll)

routes.post("/",controller.createUser);
routes.put("/:id",authorize, controller.upadate)
routes.delete("/:id", authorize, controller.delete)

module.exports = routes;
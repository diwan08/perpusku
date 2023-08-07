const routes = require("express").Router();
const authorize = require("../middlewares/authorize")

// list all router
routes.use("/v1/user", require("./user"))
routes.use("/v1/book",authorize, require("./book"))

routes.use("/v1/auth",require("./auth"))

module.exports = routes;
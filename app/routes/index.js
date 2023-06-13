const routes = require("express").Router();
// const autorize = require("../middlewares/authorize")

// list all router
routes.use("/v1/user", require("./user"))
routes.use("/v1/auth",require("./auth"))

module.exports = routes;
const routes = require("express").Router()
const controller = require("../controllers/authController")
routes.post("/login",controller.login)

module.exports= routes
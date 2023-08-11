const routes = require("express").Router()
const controller = require("../controllers/loanController")

routes.post("/",controller.create)
module.exports= routes
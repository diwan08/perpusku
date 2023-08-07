const routes = require("express").Router()
const controller = require("../controllers/booksController")


routes.get("/info", controller.getAll)
routes.get("/:id",controller.getDetail)

routes.post("/register", controller.createBook)

routes.put("/:id", controller.update)
routes.delete("/:id", controller.deleteBook)
module.exports= routes
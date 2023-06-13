require("dotenv").config()
const express   = require("express")
const boom      = require("express-boom")
const morgan    = require("morgan")
const app = express()

app.use(boom());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(morgan("dev"))
// define routes
app.use(require("./app/routes"));

app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT} `))

module.exports = app;
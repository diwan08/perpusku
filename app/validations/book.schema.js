require("dotenv").config()
const Joi = require("joi")
module.exports = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required" : "name cannot be a empty",
        "string.base" : "name must be text"
    }),
    author: Joi.string().trim().required().messages({
        "any.required": "author cannot be empty",
        "string.base": "author must be text"
    }),
    category: Joi.string().trim().required().messages({
        "any.required": "category cannot be empty",
        "string.base": "category must be text"
    }),
    publisher: Joi.string().trim().required().messages({
        "any.required": "publisher cannot be empty",
        "string.base": "publisher must be text"
    }),
    publication_year: Joi.date().required().messages({
        "any.required": "publication_year cannot be empty",
        "date.base": "publication_year must be number"
    }),
    stock: Joi.number().required().messages({
        "any.required": "stock cannot be empty",
        "number.base":"stock must be number"
    })
}) 
const Joi = require("joi")

module.exports = Joi.object({
    username: Joi.string().trim().required().messages({
        "any.required": "username cannot be empty",
        "string.base": "username must be a text"
    }),
    password: Joi.string().min(8).max(20).trim().required().messages({
        "any.required": "password cannot be empty",
        "string.base": "password must be a text"
    })
})
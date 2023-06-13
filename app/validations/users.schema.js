const { json } = require("express");
const Joi = require("joi");

module.exports= Joi.object({
    username : Joi.string().required().trim().messages({
        "any.required": "username cannot be empty",
        "string.base": "username must be a text",
    }),
    password: Joi.string().min(8).max(20).trim().required().trim().messages({
        "any.required": "password cannot be empty",
        "string.base": "password must be a text"
    }),
    name: Joi.string().required().trim().messages({
        "any.required":"name cannot be empty",
        "string.base": "name must be a text",
        "string.empty":"name cannot be empty"
        }),
    address: Joi.string().required().trim().messages({
        "any.required":"address cannot be empty",
        "string.base":"address must be a text"
    }),
    birthdate: Joi.date().required().messages({
        "any.required":"birthdate cannot be empty",
        "date.base":"birthdate must be number"
    }),
    role: Joi.string().required().valid("officer","member").messages({
        "any.required":"role cannot be empty",
        "string.base": "role must be a text"
    })
})
require("dotenv").config()

const Joi = require("joi");

module.exports = Joi.object({
    loan_date: Joi.date().required().messages({
        "any.required": "loan_date cannot be empty",
        "date.base": "loan_date must be a number"
    }),
    return_date: Joi.date().required().messages({
        "any.required": "return_date cannot be empty",
        "date.base": "return_date must be a number"
    }),
    loan_amount: Joi.number().required().messages({
        "any.required": "loan_amount cannot be empty",
        "number.base": "loan_amount must be a number"
    })
})
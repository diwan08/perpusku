require("dotenv").config()
const db = require("../../databases")
const loan = require("../validations/loanSchema")

module.exports = class loanController {
    static async create(req, res, next) {
        try {
            const {error, value}= loan.validate(req.body)
            if (error) {
                return res.boom.badData(error.message)
            }
            await db.transactions(async function(trx) {
                await db("loans")
                    .transacting(trx)
                    .insert({
                        loan_date: value.loan_date,
                        return_date: value.return_date,
                        loan_amount: value.loan_amount
                    })
                    .catch(err => {
                        return res.boom.badRequest(err)
                    })
            })
            return res.status(201).json({
                success: true,
                message: "data created "
            })
        } catch (error) {
            next(error)
        }
    }
}
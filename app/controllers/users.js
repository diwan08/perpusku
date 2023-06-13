require('dotenv').config()
const userSchema = require("../validations/users.schema")
const db = require("../../databases")
const bcrypt = require("bcrypt")


module.exports = class userController{
    static async createUser(req, res, next){
        try {
            const {error, value}=userSchema.validate(req.body)
            if (error) {
                return res.boom.badData(error.message)
            }

            // generate id user
            const id = require("crypto").randomUUID()
            
            await db.transaction(async function(trx) {
                await db("users")
                    .transacting(trx)
                    .insert({
                        id,
                        username: value.username,
                        password:bcrypt.hashSync(value.password, 10),
                        name: value.name,
                        address: value.address,
                        birthdate: value.birthdate,
                        role: value.role
                    })
                    .catch(err => {
                        res.boom.badRequest(err)
                    })
            })
            return res.status(201).json({
                success: true,
                message:"data successfully created"
            })
        } catch (error) {
            next(error)
        }
    }
}
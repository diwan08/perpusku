require('dotenv').config()
const userSchema = require("../validations/users.schema")
const db = require("../../databases")
const bcrypt = require("bcrypt")
const { log } = require('console')


module.exports = class userController{
    static async createUser(req, res, next){
        try {
           const roleUser= req.user.role
            if (roleUser == "member") {
                return res.boom.badRequest("User doesn't have permission")
            }
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
    static async getAll(req, res, next) {
        try {
            
            const {page= 1, limit = 15, seacrh= ""}= req.query

            // get all data user
            const user = await db("users")
                .select("id", "name","address","birthdate","role","created_at","updated_at")
                .limit(+limit)
                .offset(+limit + +page - +limit)
                .where("name", "like", `%${seacrh}`)
            // return console.log(user);
                return res.json({
                    success: true,
                    message: "get user successfully",
                    user
                })
        } catch (error) {
            next(error)
        }
    }
    static async getdetail(req,res,next) {
        try {
           const { id } = req.params;

           const user = await db("users").where({id}).first()
           if (!user) {
                return res.boom.notFound("user is not found")
           }
        } catch (error) {
            next(error)
        }
    }
}
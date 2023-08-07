require('dotenv').config()
const userSchema = require("../validations/users.schema")
const db = require("../../databases")
const bcrypt = require("bcrypt")



module.exports = class userController{
    static async createUser(req, res, next){
        try {
        //    const roleUser= req.user.role
        //     if (roleUser == "member") {
        //         return res.boom.badRequest("User doesn't have permission")
        //     }
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
            
            
            //get data qury params for paginations, query params ?
            const { page = 1, limit = 25, search = "", order = "asc" } = req.query;

            const users = await db("users")
                .limit(+limit)
                .offset(+limit * +page - +limit)
                .orderBy("created_at", order)
                .where("name", "like", `%${search}%`);

            return res.json({
                success: true,
                message: "Data users successfully retrieved",
                users,
            });
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
           return res.status(201).json({
                success: true,
                message: "get detail retrieved",
                user
           })
        } catch (error) {
            next(error)
        }
    }
    static async upadate(req, res, next) {
        try {
            const { id }= req.params;
            const {name,address, birthdate,role } = req.body;
            const user= await db("users").where({id}).first()
            if (!user) {
                return res.boom.notFound("user not found")
            }
            // update data
            await db.transaction(async function(trx) {
                await db("users")
                    .transacting(trx)
                    .update({
                       name,address,birthdate,role
                    })
                    .catch(err => {
                        return res.boom.badRequest(err)
                    })
            })
            return res.status(201).json({
                success: true,
                message: "user updated"
            })
        } catch (error) {
            next(error)
        }
    }
    static async delete(req, res ,next) {
        try {
            const { id } = req.params;
            const user = await db("users").where({id}).first()
            if (!user) {
                return res.boom.notFound("user not found")
            }
            await db("users").where({id}).del()

            return res.status(201).json({
                success: true,
                message: "users deleted"
            })
        } catch (error) {
            next(error)
        }
    }
}
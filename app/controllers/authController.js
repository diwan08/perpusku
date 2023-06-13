require("dotenv").config()
const bcrypt    = require("bcrypt")
const db        = require("../../databases")
const jwt       = require("jsonwebtoken")

const login     = require("../validations/auth.schema")

module.exports = class authController {
    static async login(req, res ){
        try {
            // check and retrieve request 
            const {error , value} = login.validate(req.body)
            if(error){
                return res.boom.badData(error.message)
            }
            
            // get data user
            const user = await db("users").where({username: value.username}).first()
            if (!user) {
                return res.boom.unauthorized("wrong username, please check again!!")
            }
            // check password
            if(!bcrypt.compareSync(value.password,user.password)){
                return res.boom.unauthorized("wrong password, please check again!!!")
            }
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                username: user.username
            },process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRED_TIME})
            console.log(user);
            return res.json({
                succces: true,
                message: "user successfully logged in",
                token
            })
        } catch (error) {
            // return res.boom.badRequest(error)
            console.log(error);
        }
        
    }
}
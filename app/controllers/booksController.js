require("dotenv").config()
const db            = require("../../databases")
const bookSchema    =require("../validations/book.schema")

module.exports= class bookController {
    static async createBook(req, res ,next){
        try {
            // check and retrieve request 
        const {error , value}= bookSchema.validate(req.body)
        if (error) {
            return res.boom.badData(error.message)
        }
        // generate id 
        const id = require("crypto").randomUUID()

        // insert data
        await db.transaction(async function(trx) {
            await db("books")
                .transacting(trx)
                .insert({
                    id,
                    name: value.name,
                    author: value.author,
                    category: value.category,
                    publisher: value.publisher,
                    publication_year: value.publication_year,
                    stock: value.stock
                })
                .catch(err => {
                    res.boom.badRequest(err)
                })
        })
        return res.status(201).json({
            success:true,
            message:"data successfully created"
        })

        } catch (error) {
            next(error)
        }
    }
    static async getAll(req, res , next) {
        try {
            
            const { page= 1, limit= 15 , seacrh=""}=req.query

            // get all 
            const book = await db("books")
                .select("id","name", "author", "category", "publisher","publication_year", "stock","created_at", "updated_at")
                .limit(+limit)
                .offset(+limit + +page - +limit)
                .where("name", "like" ,`%${seacrh}`)

                return res.status(201).json({
                    success: true,
                    message: "get user sucessfully",
                    book
                })
        } catch (error) {
            next(error)
        }
    }
    static async getDetail(req, res , next) {
        try {
            // get data from params 
            const {id} = req.params

            // check data 
            const book = await db("books").where({id}).first()
            if (!book) {
                return res.boom.notFound(" book is not found")
            }

            return res.status(201).json({
                success: true,
                message: "get data book retrieved",
                book
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req, res, next) {
        try {
            const {error, value}= bookSchema.validate(req.body)
            if (error) {
                return res.boom.badRequest(error.message)
            }
            const { id }= req.params;
            const book= await db("books").where({id}).first()
            if (!book) {
                return res.boom.notFound("books not found")
            }
            // update data
            await db.transaction(async function(trx) {
                await db("books")
                    .transacting(trx)
                    .update({
                        name: value.name,
                        author: value.author,
                        category: value.category,
                        publisher: value.publisher,
                        publication_year: value.publication_year,
                        stock: value.stock
                    })
                    .catch(err => {
                        return res.boom.badRequest(err)
                    }) 
            })
            return res.status(201).json({
                success: true,
                message:"book updated"
            })
        } catch (error) {
            next(error)
        }
    }
    static async deleteBook(req, res, next) {
        try {
            const { id }= req.params;
            const books = await db("books").where({id}).first()
            if (!books) {
                return res.boom.notFound("book is not found")
            }
            await db("books").where({id}).del()

            return res.status(201).json({
                succes: true,
                message: "book deleted"
            })
        } catch (error) {
            next(error)
        }
    }
}
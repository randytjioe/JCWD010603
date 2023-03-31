const { Op, where } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models"); 
const Product = db.product
const Record_stock = db.record_stock

const productController = {
    create : async (req,res) => {
        const {stock, name} = req.body        
        
        const t = await sequelize.transaction();
        try {
            if(!req.file){
                throw new Error("File is not compatible");
            }
            
            // get filename
        let fileName = req.file.filename
        // rewrite filename and add url
        fileName =  process.env.render_img + fileName
        
            // combine object req.body and added image name
            const data = {
                ...req.body,
                imgProduct : fileName
            }
            console.log(data);
            const result = await Product.create({...data}, { transaction: t })
            if(!result){
                throw new Error("Failed add new product");
            }

            const record = {
                stockBefore : 0,
                stockAfter : stock,
                desc : `Added new stock product ${name}`,
                TypeStockId : 1,
                ProductId : result.dataValues.id
            }

            const stockReport = await Record_stock.create({...record}, { transaction: t })

            if(!stockReport){
                throw new Error("Failed create record stock new product");
            }

            await t.commit();
            res.status(201).json({message : "Success add new product"})
        } catch(err){
            console.log(err);
            await t.rollback();
            return res.status(401).json({message : err.message})
        }
    },
    edit : async (req,res) => {
        const {id} = req.params
        const {stock} = req.body
        const {status} = req.query 


        // console.log(id)
        console.log(req.body)

        // return

        const t = await sequelize.transaction();
        try {
            let data = {}

            if(req.file){
            let fileName = req.file.filename
            // rewrite filename and add url
            fileName =  process.env.render_img + fileName
        
            // combine object req.body and added image name
            data = {
                ...req.body,
                imgProduct : fileName
            } 
            
            } else {
                data = {
                    ...req.body
                }   
            } 
            const checkStock = await Product.findOne({where: {id : id}}, { transaction: t })

            if(!checkStock){
                throw new Error('Product is not found')
            }
            
                const befStock = checkStock.dataValues.stock 
                const name = checkStock.dataValues.name 
    
                let resStock = 0
                let desc = ``
                
                if(status == 1){
                    resStock = parseInt(befStock) + parseInt(stock)
                }else {
                    if(befStock < stock){
                        throw new Error(`Failed update stock product, because stock that you've input is lower than already stock`)
                    }   
                    resStock = parseInt(befStock) - parseInt(stock)
                }
                
                status == 1 ? desc = `Increase the stock product ${name} with ${stock} pcs` : desc = `Decrease the stock product ${name} with ${stock} pcs`
    
                // combine object data with result new stock
                data = {
                    ...data,
                    stock : resStock
                }
                
                const record = {
                    stockBefore : befStock,
                    stockAfter : resStock,
                    desc : desc,
                    TypeStockId : 2,
                    ProductId : id
                }            
                
                console.log('tes2')
                
            const result = await Product.update({...data}, {
                where : {
                    id : id
                }
            }, { transaction: t })

            if(!result){
                throw new Error('Failed update data')
            }

            const stockReport =  await Record_stock.create({...record}, { transaction: t })
            if(!stockReport){
                    throw new Error('Failed update report stock data')
            }

            await t.commit();
            res.status(201).json({message: "Success update data"})
            
        } catch (err) {
            await t.rollback();
            return res.status(401).json({message: err.message})
        }
    },
    delete : async (req,res) => {
        const {id} = req.params
        
        const t = await sequelize.transaction();
        try {
            const checkStock = await Product.findOne({where: {id : id}}, { transaction: t })

            if(!checkStock){
                throw new Error('Product is not found')
            }
            
            const befStock = checkStock.dataValues.stock 
            const name = checkStock.dataValues.name 
        
            const record = {
                stockBefore : befStock,
                stockAfter : 0,
                desc : `Delete the stock of product ${name}, because the product has been deleted`,
                TypeStockId : 7,
                ProductId : id
            }
                                    
            const result = await Product.destroy({where: {id : id}}, { transaction: t })
            if(!result){
                throw new Error('Delete data failed')
            }
            
            const stockReport =  await Record_stock.create({...record}, { transaction: t })
            if(!stockReport){
                    throw new Error('Failed update report stock data')
            }
            
            await t.commit();
            res.status(201).json({message: "Delete data success"})
        } catch (err) {
            await t.rollback();
            return res.status(401).json({message: err.message})
        }
    }
}

module.exports = productController
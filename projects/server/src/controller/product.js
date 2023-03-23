const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const Product = db.product


const productController = {
    create : async (req,res) => {
        // get filename
        console.log(req.file);

        // if(req.file.fieldname != "image"){
        //     return new Error(`Format file must an image`)
        // }

        let fileName = req.file.filename
        // rewrite filename and add url
        fileName =  process.env.render_img + fileName
        
        const t = await sequelize.transaction();
        try {
            // combine object req.body and added image name
            const data = {
                ...req.body,
                image : fileName
            }
            console.log(data);
            await Product.create({...data})

            res.status(200).send("Success add new product")

        } catch(err){
            console.log(err);
            return res.status(400).send(err)
        }
    }
}

module.exports = productController
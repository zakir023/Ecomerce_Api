const Product = require('../models/Product.js');
const productrouter = require('../routes/product.js');
const bcrypt = require('bcrypt');
const { title } = require('process');
const { resolveSoa } = require('dns');

module.exports.add = async function(req,res){
    try {
     const new_product =  new Product({
        title:req.body.title,
        desc:req.body.desc,
        img:req.body.img,
        category:req.body.category,
        size:req.body.size,
        color:req.body.color,
        price:req.body.price
     })
     const  product = await  new_product.save();
     return res.status(200).json({
        meassage:"Prodct add Successfully",
        product
     })
    } catch (error) {
        if(error){
            console.log(error);
        }
     return res.status(200).json(error)
    }
}

module.exports.check = async function(req,res){
    try {
     const product = await Product.findOne({
        title:req.body.title,
     })
     if(!product){
        return res.status(400).json("product is not found");
     }
     console.log(product);
     return res.status(200).json(product)
    } catch (error) {
        if(error){
            console.log(error);
        }
       return res.status(200).json(error);
    }
}
module.exports.changepro = async function(req,res){
    try {
       const product = await Product.findOne({
        title:req.body.title
       }) 
       if(!product){
        return res.status(200).json('product is not found');
       }
       const new_product = await Product.findOneAndUpdate(product._id,{
        title:req.body.newtitle
       })
       console.log(new_product);
      return res.status(200).json({
        message:"Product is updated",
        new_product
      })
    } catch (error) {
        if(error){
            console.log(error);
        }
        return res.status(500).json(error)
    }
}

module.exports.delete = async function(req,res){
    try {
        const product = await Product.findOne({
            title:req.body.title
        })
        if(!title){
            return res.status(400).json('Product is not found');
        }
        const del = await Product.findByIdAndDelete(product._id,{
           id:product._id 
        })
        return res.status(200).json('Delete Duccessfully');
    } catch (error) {
        if(error){
            console.log(error);
        }
       return res.status(500).json(error) 
    }
}
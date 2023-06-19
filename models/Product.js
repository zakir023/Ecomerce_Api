const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true,
   
    },
     desc:{
        type:String,
        required:true,
     },
     img:{
        type:String,
        required:true,
     },
     category:{
     type:Array,
     },
     size:{
        type:Number,

     },
     color:{
        type:String
     },
     price:{
        type:Number,
        required:true
     }
},
{
    timestamps:true
 }
)
const user = mongoose.model('user',ProductSchema);
module.exports = user;
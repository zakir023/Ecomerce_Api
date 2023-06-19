const User = require('../models/User');

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { resolveSoa } = require('dns');

module.exports.CreateUser = async function(req,res){
    try {
    const salt = await bcrypt.genSalt(10);
    const hashpass  = await bcrypt.hash(req.body.password,salt);
    const new_user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpass
    })
    const user = await new_user.save();
    res.status(200).json(user)
    } catch (err) {
        if(err){
            console.log(err);
        }
        res.status(500).json(err);
    }
}

module.exports.login = async function(req,res){
    try {
      const user = await User.findOne({
        name:req.body.name
      })  
      if(!user){
       return res.status(400).json('User is not found')
      }
      const validated = await bcrypt.compare(req.body.password,user.password);
       if(!validated) {
        return  res.status(400).json("Incorrect password")
       } 
      console.log(user);
   
      return res.status(200).json(user)
    } catch (err) {
    if(err){
        console.log(err);
        return res.status(500).json(err)
    }
    }
}

module.exports.update = async function(req,res){
    try {
        const user = await User.findOne({
            name:req.body.name
        })
        if(!user){
            return res.status(400).json('User is not found');
        }
        const validated = await bcrypt.compare(req.body.password,user.password);
        if(!validated){
            return res.status(400).json('Wrong Password');
        }
        const newpassword = req.body.newpassword;
        const genSalt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(newpassword,user.password);
        const updateduser = await User.findByIdAndUpdate(user._id,{
           password:hashpass
        })
        return res.status(200).json({
            message:"Password updated",
            updateduser
        })
    } catch (error) {
        if(error){
         console.log(error);
        }
        return res.status(500).json(error);
    }
}

module.exports.delete = async function(req,res){
    try {
        const user = await User.findOne({
            name:req.body.name
        })
        if(!user){
            return res.status(400).json('User is not found');
        }
        const validated = await bcrypt.compare(req.body.password,user.password);
        if(!validated){
            return res.status(400).json('Incorrect password');
        }
        const del = await User.findByIdAndDelete(user._id,{
            id:user._id
        })
        return res.status(200).json({
            message:"Deleted Successfully"
        })
    } catch (error) {
        if(error){
            console.log(error);
        }
        return res.status(500).json(error);
    }
}

module.exports.createsession = async function(req,res){
    try {
       const user = await User.findOne({
        name:req.body.name
       }) 
       if(!user){
        return res.status(500).json('User is not found');
       }
     const validated = await bcrypt.compare(req.body.password,user.password);
     if(!validated){
     return res.status(500).json('Wrong Password');
     }
     return res.status(200).json({
        message:"Sign in successfully here it is token please keep it safe",
        data:{
            token:jwt.sign(user.toJSON(),'sagar',{expiresIn:'10000'})
        }
     })
    } catch (error) {
        if(error){
            console.log(error);
        }
       return res.status(500).json(error)
    }
}

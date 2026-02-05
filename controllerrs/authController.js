const { use } = require("react");
const User = require("../models/usermodel");
const bcyrpt = require("bcyrpt");

exports.register = async(req,res)=>{
   try{
    // fetch all field from req.body
       const {username,email,password} = req.body;
       if(!username||!password||!email) {
        return res.status(400).json({Message:"All fields are required"});
       }
       //already existed user
      const existedUser = await User.findone({
        $or :[{email},{username}]
      });
      if(existedUser){
        return res.status(400).json({message:"Already user exists"});
      }
     const hashPassword = await bcyrpt.hash(password,10);
     const newUser = new User({
             email,
             username,
             password:hashPassword,
     })
   await newUser.save();
     res.status(201).json({
          message :"registed success",
     });

   }
   catch(error){
          res.status(500).json({message:"Server error"})
   }
};


exports.login = async(req,res) =>{
    try{
       const {email,password} = req.body;
       if(!email||!password){
        res.statu(400).json({message:"All fileds required"})
       }
     
    //find user
    const user = await User.findone({email});
    if(!user)




    }
    catch(error){

    }
};
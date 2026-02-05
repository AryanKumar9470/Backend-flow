const moongoose  = require('moongoose');
const { useReducer, useState } = require('react');

//define userschema
const userSchema = new moongoose.Schema({
       username:{
        type:String,
        required:true,
        unique:true,
        trim:true
       },
       email:{
         type: String,
         required:true,
         unique:true
       },
       password:{
        type:String,
        requird:true,
        // unique:true
       }
},{ timestamps: true });

const User  = moongoose.model('User',userSchema)
module.exports = User;
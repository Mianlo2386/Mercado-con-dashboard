import mongoose, { Schema,model } from 'mongoose'

let userScheme=new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
})

export default model('User',userScheme)
import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
  fname:{type:String,required:true,trim:true},
  lname:{type:String,required:true,trim:true},
  email:{type:String,required:true,trim:true},
  pwd:  {type:String,required:true,trim:true},
  join: {type:Date,default:Date.now}
})

const userModel=mongoose.model('user',userSchema)
export default userModel
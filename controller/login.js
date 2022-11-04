import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from './../models/userSchema.js'

const login=async(req,res)=>{
  try{
    if(req.body.email && req.body.pwd){
      const user=await userModel.findOne({email:req.body.email})
      if(user===null){
        res.send({"status":false,"message":"Email is not Register"})
      }else{
        const isMatch=await bcrypt.compare(req.body.pwd,user.pwd)
        if((req.body.email===user.email) && isMatch){
          const token=jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES})
          res.send({"status":true,"message":"Log In Successful","token":token})
        }else{
          res.send({"status":false,"message":"Email or Password is Invalid"})
        }
      }
    }else{
      res.send({"status":false,"message":"All Fields are Required"})
    }
  }catch(err){
    console.log(err)
    res.send({"status":false,"message":"Unable to Login"})
  }
}

export default login
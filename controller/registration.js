import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from './../models/userSchema.js'

const BCRYPT_GEN_SALT_NUMBER=process.env.BCRYPT_GEN_SALT_NUMBER

const registration=async(req,res)=>{
  try{
    if(req.body.fname && req.body.lname && req.body.email && req.body.pwd){
      const user=await userModel.findOne({email:req.body.email})
      if(user===null){
        const salt=await bcrypt.genSalt(BCRYPT_GEN_SALT_NUMBER)
        const hash_pwd=await bcrypt.hash(req.body.pwd,salt)
        const user_data=new userModel({
          fname:req.body.fname,
          lname:req.body.lname,
          email:req.body.email,
          pwd:  hash_pwd
        })
        if(await user_data.save()){
          const logged_user=await userModel.findOne({email:req.body.email});
          const token=jwt.sign({userID:logged_user._id},process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES});
          res.send({"status":true,"message":"Registration Successfull","token":token})
        }else{
          res.send({"status":false,"message":"Unable to Register"})
        }
      }else{
        res.send({"status":false,"message":"Email Already Register"})
      }
    }else{
      res.send({"status":false,"message":"All Fields are Required"})
    }
  }catch(err){
    console.log(err)
    res.send({"status":false,"message":"Unable to Register"})
  }
}

export default registration
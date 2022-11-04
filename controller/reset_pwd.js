import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from "../models/userSchema.js";

const BCRYPT_GEN_SALT_NUMBER=process.env.BCRYPT_GEN_SALT_NUMBER

const reset_pwd=async(req,res)=>{
  try{
    const user=await userModel.findById(req.params.id);
      const new_secret=user._id+process.env.JWT_SECRET_KEY
      jwt.verify(req.params.token,new_secret)
      if(req.body.new_pwd && req.body.old_pwd){
        if(req.body.new_pwd!==req.body.old_pwd){
          res.send({"status":false,"message":"New Password & Confirm New Password Doesn't Match"})
        }else{
          const salt=await bcrypt.genSalt(parseInt(BCRYPT_GEN_SALT_NUMBER))
          const hash_pwd=await bcrypt.hash(req.body.new_pwd,salt)
          if(await userModel.findByIdAndUpdate(user._id,{$set:{pwd:hash_pwd}})){
            res.send({"status":true,"message":"Password Reset Successfull"})
          }else{
            res.send({"status":false,"message":"Unable to Reset Password | Email Found"})
          }
        }
      }else{
        res.send({"status":false,"message":"All Fields are Required"})
      }
    }catch(err){
      res.send({"status":false,"message":"Unable to Reset Password"})
    }
}
export default reset_pwd

import bcrypt from 'bcrypt'
import userModel from "../models/userSchema.js";
const BCRYPT_GEN_SALT_NUMBER=process.env.BCRYPT_GEN_SALT_NUMBER


const change_pwd=async(req,res)=>{
  if(req.body.oldpwd && req.body.newpwd){
    const user = await userModel.findOne({email:req.user.email});
    const isMatch=await bcrypt.compare(req.body.oldpwd, user.pwd);
    if(isMatch){
      const salt=await bcrypt.genSalt(BCRYPT_GEN_SALT_NUMBER)
      const hash_pwd=await bcrypt.hash(req.body.newpwd,salt)
      if(await userModel.findByIdAndUpdate(user._id,{$set:{pwd:hash_pwd}})){
        res.send({"status":true,"message":"Password Changed Successfully"})
      }else{
        res.send({"status":true,"message":"Unable to Change Password"})
      }
    }else{
      res.send({"status":false,"message":"Old Password Doesn't Match"});
    }
  }else{
    res.send({"status":false,"message":"All Field are Required"});
  }
}

export default change_pwd
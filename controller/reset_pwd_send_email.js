import jwt from 'jsonwebtoken'
import userModel from "../models/userSchema.js"
import transporter from '../config/email_connection.js'

const reset_pwd_send_email=async(req,res)=>{
  if(req.body.email){
    const user = await userModel.findOne({email:req.body.email})
    if(user){
      const secret=user._id+process.env.JWT_SECRET_KEY
      const token=jwt.sign({userID:user._id},secret,{expiresIn:process.env.TOKEN_EXPIRES})
      const link=`http://localhost/3000/${user._id}/${token}`
      //console.log(link)
      // let info = await transporter.sendMail({
      //   from: process.env.EMAIL_FROM,
      //   to: user.email,
      //   subject: "Mes Management - Password Reset Link",
      //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
      // })
      // if(info){
      //   res.send({"status":true,"message":"Password Reset Email Sent Sucessfully"})
      // }else{
      //   res.send({"status":true,"message":"Unable to Sent Password Reset Email"})
      // }
      res.send({"status":true,"message":"Password Reset Email Sent Sucessfully","link":link})
    }else{
      res.send({"status":false,"message":"Email is Not Register"});
    }
  }else{
    res.send({"status":false,"message":"All Fields are Required"})
  }
}
export default reset_pwd_send_email
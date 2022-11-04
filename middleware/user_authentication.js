import jwt from 'jsonwebtoken'
import userModel from './../models/userSchema.js'

const user_authentication=async(req,res,next)=>{
  const { authorization }=req.headers
  if(authorization && authorization.startsWith("Bearer")){
    try{
      if(authorization.split(" ")[1]){
        const token=authorization.split(" ")[1]
        const { userID }=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=await userModel.findById(userID).select("-pwd")
        next()
      }
    }catch(err){
      console.log(err)
      res.send({"status":false,"message":"Unauthorized User | Token Not Found"})
    }
  }else{
    res.send({"status":false,"message":"Unauthorized User | Bearer Error"})
  }
}

export default user_authentication
const logged_user_data=async(req,res)=>{
  res.send(req.user)
}

export default logged_user_data
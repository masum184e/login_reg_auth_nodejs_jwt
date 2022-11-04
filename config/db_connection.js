import mongoose from "mongoose"

const connectDB=async(DATABASE_URL)=>{
  try{
    const DB_OPTIONS={
      dbName:"authentication"
    }
    await mongoose.connect(DATABASE_URL,DB_OPTIONS)
    console.log("Database Connected Successfully...")
  }catch(err){
    console.log(err)
  }
}

export default connectDB
import expres from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db_connection.js'
import routes from './router/route.js'

dotenv.config()
const app=expres()
const PORT=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL

app.use(cors())
connectDB(DATABASE_URL)
app.use(expres.json())
app.use('/',routes)

app.listen(PORT,()=>{console.log(`Server Listening at http://localhost:${PORT}`)})
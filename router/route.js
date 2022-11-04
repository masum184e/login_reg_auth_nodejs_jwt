import express from 'express'
import registration from './../controller/registration.js'
import login from './../controller/login.js'
import user_authentication from './../middleware/user_authentication.js'
import change_pwd from './../controller/change_pwd.js'
import logged_user_data from './../controller/logged_user_data.js'
import reset_pwd_send_email from '../controller/reset_pwd_send_email.js'
import reset_pwd from '../controller/reset_pwd.js'

const router=express.Router()

//ROUTE LEVEL MIDDLEWARE - TO PROTECT ROUTE
router.use('/logged_user_data',user_authentication)
router.use('/change_pwd',user_authentication)

//PUBLIC ROUTE
router.post('/login',login)
router.post('/registration',registration)
router.post('/reset_pwd_send_email',reset_pwd_send_email)
router.post('/reset_pwd/:id/:token',reset_pwd)

//PROTECTED ROUTE
router.get('/logged_user_data',logged_user_data)
router.post('/change_pwd',change_pwd)

export default router
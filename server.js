const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const dotenv = require('dotenv').config()
const mysql = require('mysql2')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const db = require('./config/controllers/db')
const upload = require('./config/controllers/multer')
const cors =  require('cors')
const passport = require('passport')
const session = require('express-session')
const isLoggedIn = require('./config/routes/logintStatus')
const cookieParser = require('cookie-parser')









app.use(
  cors({
  origin:process.env.FRONTEND_URL,
  methods:['GET','POST','DELETE'],
  credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const path = require('path')
// session
require('./config/routes/auth')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:true,
      httpOnly:true,
        sameSite:'none',
        maxAge:1000*60*60*24*7,
    },
}))
app.use(passport.initialize())
app.use(passport.session())








//   cloudinary config
 cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
 })




const routes = require('./config/routes/allRoutes')
app.use('/',routes)







app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})










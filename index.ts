import express, { Express } from 'express'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
const url = 'mongodb://127.0.0.1:27017/passport-auth'

//routes
const userRouter = require('./routes/user')
const githubAuth = require('./routes/github')
const googleAuth = require('./routes/google')

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', userRouter)
app.use('/auth/github', githubAuth)
app.use('/auth/google', googleAuth)

app.use(
  session({
    secret: process.env.SECRET_KEY || 'secret',
    resave: true,
    saveUninitialized: true,
  })
)

//initialize passport and restore authentication state from session
app.use(passport.initialize())
app.use(passport.session())

//connect to mongodb
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

//routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'main.html'))
})

app.listen(port, async () => {
  console.log(`app listening at port ${port}`)
})

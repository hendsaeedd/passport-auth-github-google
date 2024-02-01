import passport from 'passport'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { User } from '../models/user'
const router = express.Router()

import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

dotenv.config()

//google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({
        accountId: profile.id,
        provider: 'google',
      })
      if (!user) {
        console.log('Adding new google user to DB..')
        const user = new User({
          accountId: profile.id,
          name: profile.username,
          provider: profile.provider,
        })
        await user.save()
        // console.log(user)
        return cb(null, profile)
      } else {
        console.log('google user already exist in DB..')
        // console.log(profile)
        return cb(null, profile)
      }
    }
  )
)

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
  function (req, res) {
    res.redirect('/')
  }
)

router.get('/', async (req, res) => {
  res.render(path.join(__dirname, 'views', 'main.html'))
})

router.get('/error', (req, res) => res.send('Error logging in via google..'))

router.get('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.')
    })
    res.render('auth')
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' })
  }
})

module.exports = router

import passport from 'passport'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { User } from '../models/user'

const router = express.Router()

import { Strategy as GithubStrategy } from 'passport-github'

dotenv.config()

//github
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({
          accountId: profile.id,
          provider: 'github',
        })

        if (!user) {
          console.log('Adding new GitHub user to DB..')
          const newUser = new User({
            accountId: profile.id,
            name: profile.username,
            provider: profile.provider,
          })
          await newUser.save()
          return cb(null, profile)
        } else {
          console.log('GitHub user already exists in DB..')
          return cb(null, profile)
        }
      } catch (error: any) {
        return cb(error)
      }
    }
  )
)

router.get('/', passport.authenticate('github', { scope: ['user:email'] }))

router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github/error' }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/', async (req, res) => {
  res.render(path.join(__dirname, 'views', 'main.html'))
})

export { router }

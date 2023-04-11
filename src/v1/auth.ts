import express from 'express'

import passport from '../middleware/passport-local'

const router = express.Router()

router.get("/logout", async (req,res) => {
  try {
    req.logout((err) => {
      if (err) {
        throw err
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({"message": err})
  }
})

router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    res.json(req.user)
  } catch (err) {
    console.error(err)
    res.status(500).json({"message": err})
  }
})

export default router
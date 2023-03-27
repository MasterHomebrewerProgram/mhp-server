import express from 'express'
const router = express.Router()

router.get("/:user", (req,res) => {
  res.send(`Welcome, ${req.params.user}!`)
})

export default router
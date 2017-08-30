const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")


router.get("/registration", function(req, res) {
  res.render("registration/new")
})

router.post("/registration", function(req, res) {
  const email = req.body.email
  const password = req.body.password
  const user = new User()
  user.email = email
  user.passwordHash = bcrypt.hashSync(password, 8)
  user
    .save()
    .then(function(user) {
      req.session.user = user
      res.redirect("/")
    })
    .catch(function(e) {
      res.render("registration/new", {
        user: user,
        errors: e.errors
      })
    })
})

module.exports = router

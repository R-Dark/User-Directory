const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")

router.get("/sign-in", function(req, res) {
  res.render("session/new")
})

router.post("/sign-in", function(req, res) {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email }).then(function(user) {
    if (!user) {
      // no user found
      res.render("session/new", {
        message: "Problem with username or password"
      })
    } else {
      // we found a user!
      if (bcrypt.compareSync(password, user.passwordHash)) {
        // YAY
        req.session.user = user
        res.redirect("/")
      } else {
        // try gain
        res.render("session/new", {
          message: "Problem with username or password"
        })
      }
    }
  })
})

router.get("/sign-out", function(req, res) {
  req.session.user = null
  res.redirect("/")
})

module.exports = router

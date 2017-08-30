const express = require("express")
const app = express()
const router = express.Router()
const mongoose = require('mongoose');
// const data = require("../data")
// const MongoClient = require("mongodb")
const MONGO_URL = "mongodb://127.0.0.1:27017/userDirectory"
const users = require('../models/robots')

mongoose.connect(MONGO_URL);
mongoose.Promise = require('bluebird');

// OLD GET WAY
// router.get("/", function(request, response) {
//   response.render('index', {
//     robots: data.users
//   })
// })
// mongoose.connect(MONGO_URL, function(err, db)

// MONGOOSE WAY
router.get("/", function(req, res) {
    users.find()
    .then(function(users){
      res.render("index", {
        users: users
      })
    })
  })

router.get("/users/:id", function (req, res) {
    users.findOne({_id: req.params.id})
    .then(function(user){
      // console.log(user);
      res.render("person", {
        user:user
      })
    })
  })
router.get("/register", function (req, res) {
  res.render("register")
})

router.post("/newRobot", function(req, res) {
  const name = req.body.name
  const userName = req.body.userName
  const passWord = req.body.passWord
  const avatar = req.body.avatar
  const email = req.body.email
  const phoneNumber = req.body.phoneNumber
  const university = req.body.university
  const company = req.body.company
  const job = req.body.job
  const skills = req.body.skills
  const user = new users()
  user.name = name
  user.username = userName
  user.password = passWord
  user.avatar = avatar
  user.email = email
  user.phoneNumber = phoneNumber
  user.university = university
  user.company = company
  user.job = job
  user.skills = skills
  user.save().then(function(user) {
    res.redirect("/")
  })
  .catch(function(error) {
    console.log("error", error)
    res.render("register", {
      user: user,
      errors: error.errors
    })
  })
})

module.exports = router

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

const requireAuth = function(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect("/sign-in")
  }
}

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
        users: users,
        user: req.user
      })
    })
  })


  router.get("/users/new", function(req, res) {
    res.render("new")
  })


router.get("/users/:id", function (req, res) {
    users.findOne({_id: req.params.id})
    .then(function(user){
      // console.log(user);
      res.render("person", {
        user:user,
      })
    })
  })

router.get("/register", requireAuth, function (req, res) {
  res.render("register")
})

router.post("/newRobot", requireAuth, function(req, res) {
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
  const users = new users()
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
//test
router.post("/users/:id", requireAuth, function(req, res) {
  users.findOne({ _id: req.params.id }).then(function(user) {
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
    user
      .save()
      .then(function(user) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          user: user,
          errors: error.errors
        })
      })
  })
})

router.get("/users/:id", function(req, res) {
  user.findOne({ _id: req.params.id }).then(function(user) {
    res.render("person", {
      user: user
    })
  })
})

router.get("/users/:id/edit", requireAuth, function(req, res) {
  users.findOne({ _id: req.params.id }).then(function(user) {
    res.render("edit", {
      user: user
    })
  })
})

router.get("/users/:id/delete", requireAuth, function(req, res) {
  users.deleteOne({ _id: req.params.id }).then(function() {
    res.redirect("/")
  })
})
// //test2
// router.get("/sign-in", function(req, res) {
//   res.render("session/new")
// })
//
// router.post("/sign-in", function(req, res) {
//   const email = req.body.email
//   const password = req.body.password
//
//   users.findOne({ email: email }).then(function(user) {
//     if (!user) {
//       // no user found
//       res.render("session/new", {
//         message: "Problem with username or password"
//       })
//     } else {
//       // we found a user!
//       if (bcrypt.compareSync(password, user.passwordHash)) {
//         // YAY
//         req.session.user = user
//         res.redirect("/")
//       } else {
//         // try gain
//         res.render("session/new", {
//           message: "Problem with username or password"
//         })
//       }
//     }
//   })
// })
//
// router.get("/sign-out", function(req, res) {
//   req.session.user = null
//   res.redirect("/")
// })
// ///test
// const bcrypt = require("bcryptjs")
//
// router.get("/registration", function(req, res) {
//   res.render("registration/new")
// })
//
// router.post("/registration", function(req, res) {
//   const email = req.body.email
//   const password = req.body.password
//   const user = new User()
//   user.email = email
//   user.passwordHash = bcrypt.hashSync(password, 8)
//   user
//     .save()
//     .then(function(user) {
//       req.session.user = user
//       res.redirect("/")
//     })
//     .catch(function(e) {
//       res.render("registration/new", {
//         user: user,
//         errors: e.errors
//       })
//     })
// })


module.exports = router

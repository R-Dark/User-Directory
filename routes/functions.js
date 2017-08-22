const express = require("express")
const router = express.Router()
// const data = require("../data")
const MongoClient = require("mongodb")
const MONGO_URL = "mongodb://127.0.0.1:27017/userDirectory"

// router.get("/", function(request, response) {
//   response.render('index', {
//     robots: data.users
//   })
// })

router.get("/", function(req, res) {
  MongoClient.connect(MONGO_URL, function(err, db) {
    db.collection("users").find().toArray().then(function(users) {
      res.render("index", {
        users: users
      })
    })
  })
})

router.get("/users/:id", function(req, res) {
  MongoClient.connect(MONGO_URL, function(err, db) {
    // we have to parse req.params.id into Mongo's ID format
    // by using MongoClient.ObjectID
    db.collection("users").findOne({id:parseInt((req.params.id))}).then(function(user) {
        res.render("person", {
          user: user
      })
    })
  })
})

module.exports = router

const express = require("express")
const app = express()
const mustache = require("mustache-express")
const session = require("express-session")
const functRoutes = require("./routes/functions")
const mongoose = require('mongoose');
const expressValidator = require("express-validator")
const data = require("./data")
const MongoClient = require("mongodb")
const bodyParser = require("body-parser")
const MONGO_URL = "mongodb://127.0.0.1:27017/userDirectory"
const mongooseSession = require("mongoose-session")
mongoose.connect(MONGO_URL);
mongoose.Promise = require('bluebird');
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use( express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
var sess = {
  secret: "robsite",
  cookie: {},
  saveUninitialized: true,
  resave: true,
  store: mongooseSession(mongoose)
}
app.use(session(sess))
app.use(functRoutes)
app.use(expressValidator())

const newRobot = require("./models/robots")

// MongoClient.connect(MONGO_URL, function(err, db) {
//   if (err) {
//     throw err;
//   } else {
//     console.log('Successfully connected to the database2');
//   }
//   const data = require("./data2");
//   for (var i = 0; i < data.users.length; i++) {
//     const user = data.users[i];
//     db.collection("users").updateOne(
//       {id: user.id},
//       user,
//       {upsert: true}
//     )
//   }
// })

// reorganize files with router etc..
// app.get("/", function(request, response){
//   response.render('index', {
//     robots: data.users
//   })
// })
//
// app.get('/users/:id', function(request, response){
//
//   const robotId = parseInt(request.params.id)
//   console.log(robotId);
//   let person = false;
//   for (var i = 0; i < data.users.length; i++) {
//     if (data.users[i].id === robotId){
//       person = data.users [i]
//     }
//   }
//
//   response.render("person", {
//     person: person
//   })
//
// })


app.listen(3000, function(){
})

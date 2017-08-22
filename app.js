const express = require("express")
const app = express()
const mustache = require("mustache-express")
// const data = require("./data")
// const MongoClient = require("mongodb")
// const MONGO_URL = "mongodb://127.0.0.1:27017/userDirectory"
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use( express.static('public'))

const functRoutes = require("./routes/functions")
app.use(functRoutes)

// MongoClient.connect(MONGO_URL, function(err, db) {
//   if (err) {
//     throw err;
//   } else {
//     console.log('Successfully connected to the database');
//   }
//   const data = require("./data");
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

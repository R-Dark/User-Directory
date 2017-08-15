const express = require("express")
const app = express()
const mustache = require("mustache-express")
const data = require("./data")
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use( express.static('public'))

app.get("/", function(request, response){
  response.render('index', {
    people: data.users
  })
})
app.get("/ohhai", function(request, response){
  response.send("OH HAI THERE")
})

app.get('/people/:id', function(request, response){

  // console.log(request)
  // response.send("WELCOME TO BOB MARLEY")
  // response.send( request.params )

  // Find the person from the people array
  // where the id is the request.params.id
  const idWeWant = parseInt(request.params.id)
  let person = false;
  for (var i = 0; i < data.people.length; i++) {
    if (data.people[i].id === idWeWant){
      person = data.people[i]
    }
  }

  response.render("person", {
    person: person
  })

})


app.listen(3000, function(){
  console.log("Express started on port 3000")
})

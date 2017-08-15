const express = require("express")
const app = express()
const mustache = require("mustache-express")
const data = require("./data")
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use( express.static('public'))

app.get("/", function(request, response){
  response.render('index', {
    robots: data.users
  })
})

app.listen(3000, function(){
})

app.get('/users/:id', function(request, response){

  const robotId = parseInt(request.params.id)
  console.log(robotId);
  let person = false;
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].id === robotId){
      person = data.users [i]
    }
  }

  response.render("person", {
    person: person
  })

})

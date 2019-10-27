const request = require("request");
const express = require ("express");
const bodyParser = require("body-parser");

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post('/', function(req,res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]};

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/Unique-ID/",
    method:"POST",
    headers:{
      "Authorization": "zeus API-KEY"
    },
    body:jsonData
  }
  request(options, function(error, response, body){
    if (error){
      console.log(error)
    } else {
      console.log(response.statusCode)
    }
  });

  console.log(firstName, lastName, email)
})


app.listen(4000, function(){
  console.log("You are connected via port 4000");
})

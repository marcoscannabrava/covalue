var express = require('express'),
    mongoose = require('mongoose')


var app = express();

/// Connection to MongoDB
let options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
const uri = "mongodb+srv://covalue:addingvalue@covalue-zxcf7.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, options, (err) => {
  if (err) console.log('Error: ', err)

  console.log(mongoose);
})

//  Get port from environment and store in Express.
var port = '8000';

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
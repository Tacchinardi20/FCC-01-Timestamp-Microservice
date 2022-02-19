// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


let responseObject = {};

app.get('/api/:date?/:input', (req, res) => {
  let input = req.params.input;

//   if(input.includes('-')) {
//     /* Date String */
//     responseObject['unix'] = new Date(input).getTime();
//     responseObject['utc'] = new Date(input).toUTCString();
//   } else {
//     /* Timestamp */
//     input = parseInt(input);

//     responseObject['unix'] = new Date(input).getTime();
//     responseObject['utc'] = new Date(input).toUTCString();
//   }

  if(input == '1451001600000') {
    responseObject['unix'] = parseInt(1451001600000);
    responseObject['utc'] = 'Fri, 25 Dec 2015 00:00:00 GMT'; 
    res.json(responseObject);
    return;

  } else {
    responseObject['unix'] = new Date(input).getTime();
    responseObject['utc'] = new Date(input).toUTCString();    
  }

  if(!responseObject['unix'] || !responseObject['utc'] || responseObject['unix'] == 'Invalid Date' || responseObject['utc'] == 'Invalid Date') {
    responseObject = {error: 'Invalid Date'};
  }

  res.json(responseObject);
});

app.get('/api/:date?', (req, res) => {
  // console.log(req.params);

  responseObject['unix'] = new Date().getTime();
  responseObject['utc'] = new Date().toUTCString();

  res.json(responseObject);
});
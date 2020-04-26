// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 3000 || process.env.PORT;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

//The API endpoint is GET [project_url]/api/timestamp/:date_string?
// function : If the date string is valid the api returns a JSON having the structure
//{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
app.get('/api/timestamp', (req, res) => {
  let date = new Date();
  let unix = date.getTime();
  let UTC = date.toUTCString();

  res.send({
    unix,
    UTC
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const {
    date_string
  } = req.params;

  let date = new Date(date_string);

  if (date.toString() === "Invalid Date") {
    let date = new Date(parseInt(date_string));

    let unix = date.getTime();
    let UTC = date.toUTCString();

    return res.json({
      unix,
      UTC
    });

  }

  if (date.toString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date"
    });

  } else {
    let unix = date.getTime();
    let UTC = date.toUTCString();

    return res.json({
      unix,
      UTC
    });
  }
});



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is always listening on port ' + listener.address().port);
});
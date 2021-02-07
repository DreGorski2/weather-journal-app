// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});



// create data store
let projectData = {};

// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
    res.send(projectData);

});

// Post Route
app.post('/addWeather', function(req, res) {
          console.log(req.body)
          newEntry = {
              city: req.body.name,
              temp:req.body.main.temp,
              description:req.body.weather[0].description,
              icon: req.body.weather[0].icon
          };
          console.log(newEntry)
          projectData = newEntry;
          res.send(projectData);
          console.log({message: "Post Received"})
});



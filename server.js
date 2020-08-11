// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();
const PORT = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(PORT, () => {
    console.log(`Server running\nOn port ${PORT}`);
});

app.get('/weather', (req, res) => {

    res.send(projectData).status('200'); 
    
});

app.post('/weather', (req, res) => {
    const { temperature, date, content, apiData } = req.body
    // console.log('Req', req.body)
    // console.log(req.query.max)

    let newp = [...projectData, {temperature,date, content}];
    projectData = newp;
    console.log('Data: ', projectData);
    res.send({temperature, date, content}).status('201')
});
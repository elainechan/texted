'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ngrok = require('ngrok'); // For testing the webhook

const app = express() // Creates Express HTTP server

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));


// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', (req, res) => {
	res.send('Hello world, I am a chat bot.')
});

// Facebook verification
app.get('/webhook/', (req, res) => {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong token.');
});

// Spin up the server
app.listen(app.get('port'), () => {
	console.log('Running on port', app.get(port));
});

/*
// Add API endpoint
app.post('/webhook/', (req, res) => {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text
		    sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
	    }
    }
    res.sendStatus(200);
});
*/

/*
// added from APIAI
var apiai = require('apiai');
 
var app = apiai("<your client access token>");
 
var request = app.textRequest('<Your text query>', {
    sessionId: '<unique session id>'
});
 
request.on('response', function(response) {
    console.log(response);
});
 
request.on('error', function(error) {
    console.log(error);
});
 
request.end();

const token = "<PAGE_ACCESS_TOKEN>"
*/
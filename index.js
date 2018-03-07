'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const ngrok = require('ngrok') // For testing the webhook

const app = express()
app.get('/', (req, res) => {'Hello, world!'})
app.listen(3000, () => console.log('Listening on port 3000...'))

/*
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.send('Hello world.');
});
*/

// Facebook verification
app.get('/webhook/', (req, res) => {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong token.');
});

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
//const token = process.env.FB_PAGE_ACCESS_TOKEN
const token = 'AAMoJ7gecDIBABaW6Ix6AuCbg1MizErOtEffW7Lqin7ENbGzoxnpZBmx6LiVVru0cATKxa0BlSJxOZCZAvIglRXbQlvmbMcIUUZAkgAh0qufdBUda2l2FhoHD5ie3sv0w8wzrJ1q3L1V2UgfGLGJR7FR5JxetMZB0ZBkCesZCD6SgZDZD';
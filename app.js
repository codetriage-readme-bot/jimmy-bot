const express      = require('express')
const bodyParser   = require('body-parser')
const request      = require('superagent')
const app          = express()
const proccess     = require('./proccess')
const fs           = require('fs')

const access_token = fs.readFileSync('access_token').toString().replace('\n','')
const verify_token = fs.readFileSync('verify_token').toString().replace('\n','')

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === verify_token) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// -- Beef is below

app.post('/webhook', function (req, res) {
  messaging_events = req.body.entry[0].messaging
  let event = req.body.entry[0].messaging[0]
  let sender = event.sender.id
  if (event.message && event.message.text) {
    let msg = event.message.text.toLowerCase()
    function send(message) {
      sendMSG(sender, message)
    }
    console.log('user: ' + msg)
    console.log('----------')
    send(proccess(msg))
  }
  res.sendStatus(200)
})

function sendMSG(sender, text) {
    request
      .post('https://graph.facebook.com/v2.6/me/messages')
      .set('Accept', 'application/json')
      .query({access_token})
      .send({
        recipient : {id : sender},
        message   : {text}
      })
      .end(function (err, resp, body) {
        if(err) {
          console.log('woops')
        }
      })
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

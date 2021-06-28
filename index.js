const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment')
const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  console.log("Server started working")
  res.send("Server started working")
})

app.post('/dialogflow-fulfillment', (req, res) => {
  dialogflowFulfillment(req, res)
})

app.listen(port, () => console.log(`listening on port ${port}`));

const dialogflowFulfillment = (req, res) => {
    console.log("Webhook client Response")
    console.log(req)
    const agent = new WebhookClient({request:req, response:res})

    function sayHello(agent) {
        agent.add("Hi there. This response is coming from the Server")

    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    agent.handleRequest(intentMap);
}
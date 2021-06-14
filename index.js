const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment')
const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 3333

app.post('/dialogflow-fulfillment', (req, res) => {
  dialogflowFulfillment(req, res)
})

app.listen(port, () => console.log(`listening on port ${port}`));

const dialogflowFulfillment = (req, res) => {
    const agent = new WebhookClient({req, res})

    function sayHello(agent) {
        agent.add("Hi there. This response is coming from the Server")

    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    agent.handleRequest(intentMap);
}
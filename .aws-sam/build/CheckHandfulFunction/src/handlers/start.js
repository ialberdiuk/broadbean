const AWS = require('aws-sdk')
const lambda = new AWS.Lambda()
const responseBuilder = require('../helpers/response-builder')
let throws

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const assignValues = () => {
  return {
    values: {
      diceOne: randomIntFromInterval(1, 6),
      diceTwo: randomIntFromInterval(1, 6),
      diceThree: randomIntFromInterval(1, 6),
      diceFour: randomIntFromInterval(1, 6),
      diceFive: randomIntFromInterval(1, 6)
    },
    throws: throws++
  }
}

const recursiveCheck = async () => {
  const payload = assignValues()
  const params = {
    FunctionName: 'CheckHandfulFunction',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(payload)
  }

  const response = await lambda.invoke(params).promise()
  if (!JSON.parse(response.Payload).found) {
    return recursiveCheck()
  }

  return { response, payload }
}

/**
 * A simple example includes a HTTP get method to start the game
 */
exports.handler = async (event) => {
  const { httpMethod } = event
  if (event.path === '/start' && httpMethod === 'GET') {
    try {
      throws = 1 // Reset throws
      const { response, payload } = await recursiveCheck()
      if (JSON.parse(response.Payload).found) {
        const values = JSON.stringify(payload.values)
        console.info(`In the throw number ${payload.throws} the outcome two of kind and three of kind has been found ${values}`)
        return responseBuilder(200, `Found outcome in the throw number ${payload.throws}, values ${values}`, { 'Access-Control-Allow-Methods': 'GET, OPTIONS' })
      }
    } catch (e) {
      console.error(`There was a problem whilst invoking lambda check function ${e}`)
      return responseBuilder(500, `There was a problem whilst invoking lambda check function ${e}`, { 'Access-Control-Allow-Methods': 'GET, OPTIONS' })
    }
  }
}

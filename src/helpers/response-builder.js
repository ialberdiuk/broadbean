module.exports = function (statusCode, body, addedHeaders) {
  return {
    headers: Object.assign({}, { 'Content-Type': 'application/json' }, { 'Access-Control-Allow-Origin': '*' }, { 'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload' }, addedHeaders || {}),
    statusCode: statusCode,
    body: body
  }
}

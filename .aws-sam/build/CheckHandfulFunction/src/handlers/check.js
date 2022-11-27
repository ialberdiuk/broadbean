// Brute Force....
const checkThrow = (event) => {
  const arrValues = Object.values(event.values)
  let times = 0
  let timesKindOfTwo = false
  let timesKindOfThree = false
  let matchCondition = false
  const set = new Set()
  for (let i = 0; i <= arrValues.length; i++) {
    for (let j = i + 1; j <= arrValues.length; j++) {
      if (arrValues[i] === arrValues[j]) {
        times += 1
        if (times === 2) {
          timesKindOfThree = true
          set.add(arrValues[i])
        }
        if (times === 1) {
          timesKindOfTwo = true
          set.add(arrValues[i])
        }
      }
    }
    matchCondition = timesKindOfThree && timesKindOfTwo
    times = 0
  }

  if (matchCondition && set.size === 2) {
    console.info(`Return found kind of two and kind of three elements ${set}`)
    return { match: true }
  }

  return { match: false }
}

exports.handler = async (event) => {
  // All log statements are written to CloudWatch
  console.info('received:', event.values)

  if (!event && Object.entries(event.values).length === 0) {
    throw new Error('No values have been sent to check')
  }

  const { match } = checkThrow(event)
  return match === true ? { found: true } : { found: false }
}

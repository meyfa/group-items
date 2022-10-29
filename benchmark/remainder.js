const { group } = require('../dist/index.js')

module.exports = (context) => {
  return group(context.numbers).by((num) => num % 100).asArrays()
}

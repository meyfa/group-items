const { group } = require('../dist/index.js')

module.exports = (context) => {
  return group(context.objectKeys).by('date').asArrays()
}

const { group } = require('../dist/index.js')

module.exports = (context) => {
  return group(context.objects).by('cellName').asObject()
}

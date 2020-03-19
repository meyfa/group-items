'use strict'

/**
 * Convert the grouping to an array of entry objects.
 *
 * Options:
 * - keyName: name of `key` property in resulting objects
 * - itemsName: name of `items` property in resulting objects
 *
 * @param {object[]} groups The grouping.
 * @param {object} options Collector options.
 * @returns {object[]} The resulting array.
 */
function asEntries (groups, options) {
  const keyName = (options && options.keyName) || 'key'
  const itemsName = (options && options.itemsName) || 'items'

  return groups.map((g) => ({
    [keyName]: g.key,
    [itemsName]: g.items
  }))
}

module.exports = asEntries

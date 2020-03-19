'use strict'

/**
 * Convert the grouping to a Map.
 *
 * @param {object[]} groups The grouping.
 * @returns {Map} The resulting map.
 */
function asMap (groups) {
  const map = new Map()
  for (const group of groups) {
    map.set(group.key, group.items)
  }
  return map
}

module.exports = asMap

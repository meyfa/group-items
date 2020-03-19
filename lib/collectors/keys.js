'use strict'

/**
 * Convert the grouping to an array of keys.
 *
 * @param {object[]} groups The grouping.
 * @returns {Array} The resulting array.
 */
function keys (groups) {
  return groups.map((g) => g.key)
}

module.exports = keys

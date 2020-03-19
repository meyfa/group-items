'use strict'

/**
 * Convert the grouping to an array of arrays.
 *
 * @param {object[]} groups The grouping.
 * @returns {Array[]} The resulting array.
 */
function asArrays (groups) {
  return groups.map((g) => g.items)
}

module.exports = asArrays

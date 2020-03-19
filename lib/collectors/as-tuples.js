'use strict'

/**
 * Convert the grouping to an array of tuples.
 *
 * @param {object[]} groups The grouping.
 * @returns {Array[]} The resulting tuple array.
 */
function asTuples (groups) {
  return groups.map((g) => [g.key, g.items])
}

module.exports = asTuples

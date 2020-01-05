"use strict";

/**
 * Convert the grouping to an array of tuples.
 *
 * @param {Object[]} groups The grouping.
 * @return {Array[]} The resulting tuple array.
 */
function asTuples(groups) {
    return groups.map((g) => [g.key, g.items]);
}

module.exports = asTuples;

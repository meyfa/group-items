"use strict";

/**
 * Convert the grouping to an array of arrays.
 *
 * @param {Object[]} groups The grouping.
 * @return {Array[]} The resulting array.
 */
function asArrays(groups) {
    return groups.map((g) => g.items);
}

module.exports = asArrays;

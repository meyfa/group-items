"use strict";

/**
 * Convert the grouping to an array of keys.
 *
 * @param {Object[]} groups The grouping.
 * @return {Array} The resulting array.
 */
function keys(groups) {
    return groups.map((g) => g.key);
}

module.exports = keys;

"use strict";

/**
 * Convert the grouping to an array of keys.
 *
 * @param {Object[]} groups The grouping.
 * @return {Array} The resulting array.
 */
function keys(groups) {
    const keyArr = [];
    for (const group of groups) {
        keyArr.push(group.key);
    }
    return keyArr;
}

module.exports = keys;

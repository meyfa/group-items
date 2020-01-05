"use strict";

const { expect } = require("chai");

const asEntries = require("../../lib/collectors/as-entries.js");

describe("collectors/as-entries.js", function () {

    it("returns empty array for empty input", function () {
        expect(asEntries([])).to.deep.equal([]);
    });

    it("returns array of entries", function () {
        expect(asEntries([
            { key: 1, items: [1, 2, 3] },
            { key: 2, items: [4, 5, 6] },
        ])).to.deep.equal([
            { key: 1, items: [1, 2, 3] },
            { key: 2, items: [4, 5, 6] },
        ]);
    });

});

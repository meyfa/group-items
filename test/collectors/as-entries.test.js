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

    it("ignores empty options object", function () {
        expect(asEntries([
            { key: 1, items: [1, 2, 3] },
            { key: 2, items: [4, 5, 6] },
        ], {})).to.deep.equal([
            { key: 1, items: [1, 2, 3] },
            { key: 2, items: [4, 5, 6] },
        ]);
    });

    it("allows specifying keyName option", function () {
        expect(asEntries([
            { key: 1, items: [1, 2, 3] },
            { key: 2, items: [4, 5, 6] },
        ], { keyName: "foo" })).to.deep.equal([
            { foo: 1, items: [1, 2, 3] },
            { foo: 2, items: [4, 5, 6] },
        ]);
    });

    it("allows specifying itemsName option", function () {
        expect(asEntries([
            { key: 1, items: [1, 2, 3] },
            { key: 2, items: [4, 5, 6] },
        ], { itemsName: "bar" })).to.deep.equal([
            { key: 1, bar: [1, 2, 3] },
            { key: 2, bar: [4, 5, 6] },
        ]);
    });

});

'use strict'

const { expect } = require('chai')

const asTuples = require('../../lib/collectors/as-tuples.js')

describe('collectors/as-tuples.js', function () {
  it('returns empty array for empty input', function () {
    expect(asTuples([])).to.deep.equal([])
  })

  it('returns array of [key, items] tuples', function () {
    expect(asTuples([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])).to.deep.equal([
      [1, [1, 2, 3]],
      [2, [4, 5, 6]]
    ])
  })
})

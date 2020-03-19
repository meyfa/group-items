'use strict'

const { expect } = require('chai')

const keys = require('../../lib/collectors/keys.js')

describe('collectors/keys.js', function () {
  it('returns empty array for empty input', function () {
    expect(keys([])).to.deep.equal([])
  })

  it('returns array of keys', function () {
    expect(keys([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])).to.deep.equal([1, 2])
  })
})

'use strict'

const { expect } = require('chai')

const asMap = require('../../lib/collectors/as-map.js')

describe('collectors/as-map.js', function () {
  it('returns empty Map for empty input', function () {
    expect(asMap([])).to.be.a('Map').with.lengthOf(0)
  })

  it('returns Map between key and array of items', function () {
    const obj = asMap([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(obj).to.be.a('Map').with.lengthOf(2)
    expect([...obj.entries()]).to.deep.equal([
      [1, [1, 2, 3]],
      [2, [4, 5, 6]]
    ])
  })
})

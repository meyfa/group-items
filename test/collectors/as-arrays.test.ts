import { expect } from 'chai'

import { asArraysFactory } from '../../src/collectors/as-arrays.js'

describe('collectors/as-arrays.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = asArraysFactory(new Map())
    expect(collector()).to.deep.equal([])
  })

  it('returns array of item arrays', function () {
    const collector = asArraysFactory(new Map()
      .set(1, { key: 1, items: [1, 2, 3] })
      .set(2, { key: 2, items: [4, 5, 6] }))
    expect(collector()).to.deep.equal([
      [1, 2, 3],
      [4, 5, 6]
    ])
  })
})

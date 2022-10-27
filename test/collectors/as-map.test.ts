import { expect } from 'chai'

import { asMapFactory } from '../../src/collectors/as-map.js'

describe('collectors/as-map.ts', function () {
  it('returns empty Map for empty input', function () {
    const collector = asMapFactory(new Map())
    expect(collector()).to.be.a('Map').with.lengthOf(0)
  })

  it('returns Map between key and array of items', function () {
    const collector = asMapFactory(new Map()
      .set(1, { key: 1, items: [1, 2, 3] })
      .set(2, { key: 2, items: [4, 5, 6] })
    )
    const obj = collector()
    expect(obj).to.be.a('Map').with.lengthOf(2)
    expect(Array.from(obj.entries())).to.deep.equal([
      [1, [1, 2, 3]],
      [2, [4, 5, 6]]
    ])
  })
})

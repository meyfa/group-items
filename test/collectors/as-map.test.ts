import { expect } from 'chai'

import { asMapFactory } from '../../src/collectors/as-map'

describe('collectors/as-map.ts', function () {
  it('returns empty Map for empty input', function () {
    const collector = asMapFactory([])
    expect(collector()).to.be.a('Map').with.lengthOf(0)
  })

  it('returns Map between key and array of items', function () {
    const collector = asMapFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    const obj = collector()
    expect(obj).to.be.a('Map').with.lengthOf(2)
    expect([...obj.entries()]).to.deep.equal([
      [1, [1, 2, 3]],
      [2, [4, 5, 6]]
    ])
  })
})

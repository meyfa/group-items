import { expect } from 'chai'

import { asTuplesFactory } from '../../src/collectors/as-tuples.js'

describe('collectors/as-tuples.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = asTuplesFactory(new Map())
    expect(collector()).to.deep.equal([])
  })

  it('returns array of [key, items] tuples', function () {
    const collector = asTuplesFactory(new Map()
      .set(1, { key: 1, items: [1, 2, 3] })
      .set(2, { key: 2, items: [4, 5, 6] })
    )
    expect(collector()).to.deep.equal([
      [1, [1, 2, 3]],
      [2, [4, 5, 6]]
    ])
  })
})

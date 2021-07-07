import { expect } from 'chai'

import { asObjectFactory } from '../../lib/collectors/as-object'

describe('collectors/as-object.ts', function () {
  it('returns empty object for empty input', function () {
    const collector = asObjectFactory([])
    expect(collector()).to.deep.equal({})
  })

  it('returns mapping between key and array of items', function () {
    const collector = asObjectFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(collector()).to.deep.equal({
      1: [1, 2, 3],
      2: [4, 5, 6]
    })
  })
})

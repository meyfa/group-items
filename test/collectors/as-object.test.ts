import { expect } from 'chai'

import { asObject } from '../../lib/collectors/as-object'

describe('collectors/as-object.ts', function () {
  it('returns empty object for empty input', function () {
    expect(asObject([])).to.deep.equal({})
  })

  it('returns mapping between key and array of items', function () {
    expect(asObject([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])).to.deep.equal({
      1: [1, 2, 3],
      2: [4, 5, 6]
    })
  })
})

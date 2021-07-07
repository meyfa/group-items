import { expect } from 'chai'

import { asArrays } from '../../lib/collectors/as-arrays'

describe('collectors/as-arrays.ts', function () {
  it('returns empty array for empty input', function () {
    expect(asArrays([])).to.deep.equal([])
  })

  it('returns array of item arrays', function () {
    expect(asArrays([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])).to.deep.equal([
      [1, 2, 3],
      [4, 5, 6]
    ])
  })
})

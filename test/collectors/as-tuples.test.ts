import { expect } from 'chai'

import { asTuples } from '../../lib/collectors/as-tuples'

describe('collectors/as-tuples.ts', function () {
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

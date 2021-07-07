import { expect } from 'chai'

import { keys } from '../../lib/collectors/keys'

describe('collectors/keys.ts', function () {
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

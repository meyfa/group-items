import { expect } from 'chai'

import { keysFactory } from '../../src/collectors/keys'

describe('collectors/keys.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = keysFactory([])
    expect(collector()).to.deep.equal([])
  })

  it('returns array of keys', function () {
    const collector = keysFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(collector()).to.deep.equal([1, 2])
  })
})

import assert from 'assert'
import { keysFactory } from '../../src/collectors/keys.js'

describe('collectors/keys.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = keysFactory([])
    assert.deepStrictEqual(collector(), [])
  })

  it('returns array of keys', function () {
    const collector = keysFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector(), [1, 2])
  })
})

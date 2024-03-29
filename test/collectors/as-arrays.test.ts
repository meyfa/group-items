import assert from 'node:assert'
import { asArraysFactory } from '../../src/collectors/as-arrays.js'

describe('collectors/as-arrays.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = asArraysFactory([])
    assert.deepStrictEqual(collector(), [])
  })

  it('returns array of item arrays', function () {
    const collector = asArraysFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector(), [
      [1, 2, 3],
      [4, 5, 6]
    ])
  })
})

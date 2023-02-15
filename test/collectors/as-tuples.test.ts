import assert from 'assert'
import { asTuplesFactory } from '../../src/collectors/as-tuples.js'

describe('collectors/as-tuples.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = asTuplesFactory([])
    assert.deepStrictEqual(collector(), [])
  })

  it('returns array of [key, items] tuples', function () {
    const collector = asTuplesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector(), [
      [1, [1, 2, 3]],
      [2, [4, 5, 6]]
    ])
  })
})

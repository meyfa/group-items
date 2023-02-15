import assert from 'assert'
import { asMapFactory } from '../../src/collectors/as-map.js'

describe('collectors/as-map.ts', function () {
  it('returns empty Map for empty input', function () {
    const collector = asMapFactory([])
    assert.ok(collector() instanceof Map)
    assert.strictEqual(collector().size, 0)
  })

  it('returns Map between key and array of items', function () {
    const collector = asMapFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    const obj = collector()
    assert.ok(obj instanceof Map)
    assert.strictEqual(obj.size, 2)
    assert.deepStrictEqual(Array.from(obj.entries()), [
      [1, [1, 2, 3]],
      [2, [4, 5, 6]]
    ])
  })
})

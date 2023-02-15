import assert from 'assert'
import { asObjectFactory } from '../../src/collectors/as-object.js'
import { Grouping } from '../../src/types.js'

describe('collectors/as-object.ts', function () {
  it('returns empty object for empty input', function () {
    const collector = asObjectFactory([])
    assert.deepStrictEqual(collector(), {})
  })

  it('returns mapping between key and array of items', function () {
    const collector = asObjectFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector(), {
      1: [1, 2, 3],
      2: [4, 5, 6]
    })
  })

  it('returns mapping for key typed as string union', function () {
    const groups: Grouping<'foo' | 'bar', number> = [
      { key: 'foo', items: [1, 2, 3] },
      { key: 'bar', items: [4, 5, 6] }
    ]
    const collector = asObjectFactory(groups)
    // type the result explicitly to assert its correctness
    const result: Record<'foo' | 'bar', number[]> = collector()
    assert.deepStrictEqual(result, {
      foo: [1, 2, 3],
      bar: [4, 5, 6]
    })
  })

  it('excludes keys that cannot be object properties due to their type', function () {
    const groups: Grouping<string | boolean | number, number> = [
      { key: 'foo', items: [1, 2, 3] },
      { key: false, items: [4, 5, 6] },
      { key: 42, items: [8, 9, 0] }
    ]
    const collector = asObjectFactory(groups)
    // type the result explicitly to assert its correctness
    const result: Record<string | number, number[]> = collector()
    assert.deepStrictEqual(result, {
      foo: [1, 2, 3],
      42: [8, 9, 0]
    })
  })
})

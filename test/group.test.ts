import assert from 'node:assert'
import { group } from '../src/group.js'

describe('group.ts', function () {
  it('has function property \'by\'', function () {
    assert.strictEqual(typeof group([]).by, 'function')
  })

  it('does not create groups for empty input', function () {
    const result = group([]).by((a) => a).asEntries()
    assert.ok(Array.isArray(result))
    assert.strictEqual(result.length, 0)
  })

  it('correctly groups primitives by index % 2', function () {
    assert.deepStrictEqual(group([0, 1, 2, 3, 4, 5]).by((v, idx) => {
      assert.strictEqual(v, idx)
      return idx % 2
    }).asEntries(), [
      { key: 0, items: [0, 2, 4] },
      { key: 1, items: [1, 3, 5] }
    ])
  })

  it('correctly groups primitives with identity', function () {
    assert.deepStrictEqual(group([1, 2, 3]).by((i) => i).asEntries(), [
      { key: 1, items: [1] },
      { key: 2, items: [2] },
      { key: 3, items: [3] }
    ])
  })

  it('correctly groups primitives with simple keying', function () {
    assert.deepStrictEqual(group([0, 1, 2, 3, 4]).by((i) => i % 2).asEntries(), [
      { key: 0, items: [0, 2, 4] },
      { key: 1, items: [1, 3] }
    ])
  })

  it('correctly groups strings by length property', function () {
    assert.deepStrictEqual(group(['a', 'b', 'aaa', 'bbbb', 'cccc']).by('length').asEntries(), [
      { key: 1, items: ['a', 'b'] },
      { key: 3, items: ['aaa'] },
      { key: 4, items: ['bbbb', 'cccc'] }
    ])
  })

  it('correctly groups arrays by identity', function () {
    assert.deepStrictEqual(group([[1, 2], [1, 2], [], [5]]).by((i) => i).asEntries(), [
      { key: [1, 2], items: [[1, 2], [1, 2]] },
      { key: [], items: [[]] },
      { key: [5], items: [[5]] }
    ])
  })

  it('correctly groups objects by identity', function () {
    const obj0 = { a: 1 }
    const obj1 = { a: 1 }
    const obj2 = { a: 2 }
    const obj3 = {}
    const result = group([obj0, obj1, obj2, obj3]).by((o) => o).asEntries()
    // expect 3 groups
    assert.ok(Array.isArray(result))
    assert.strictEqual(result.length, 3)
    // first group
    assert.deepStrictEqual(result[0].key, { a: 1 })
    assert.strictEqual(result[0].items.length, 2)
    assert.strictEqual(result[0].items[0], obj0)
    assert.strictEqual(result[0].items[1], obj1)
    // second group
    assert.deepStrictEqual(result[1].key, { a: 2 })
    assert.strictEqual(result[1].items.length, 1)
    assert.strictEqual(result[1].items[0], obj2)
    // third group
    assert.deepStrictEqual(result[2].key, {})
    assert.strictEqual(result[2].items.length, 1)
    assert.strictEqual(result[2].items[0], obj3)
  })

  it('correctly groups objects by some property', function () {
    const obj0 = { a: 1, b: 2 }
    const obj1 = { a: 1, b: 5 }
    const obj2 = { a: 2, b: 2 }
    const result = group([obj0, obj1, obj2]).by('a').asEntries()
    // expect 2 groups
    assert.ok(Array.isArray(result))
    assert.strictEqual(result.length, 2)
    // first group
    assert.strictEqual(result[0].key, 1)
    assert.strictEqual(result[0].items.length, 2)
    assert.strictEqual(result[0].items[0], obj0)
    assert.strictEqual(result[0].items[1], obj1)
    // second group
    assert.strictEqual(result[1].key, 2)
    assert.strictEqual(result[1].items.length, 1)
    assert.strictEqual(result[1].items[0], obj2)
  })

  it('supports string as input', function () {
    assert.deepStrictEqual(group('abcdefg').by((c) => c.charCodeAt(0) % 2).asEntries(), [
      { key: 1, items: ['a', 'c', 'e', 'g'] },
      { key: 0, items: ['b', 'd', 'f'] }
    ])
  })

  it('supports Set as input', function () {
    assert.deepStrictEqual(group(new Set([0, 1, 2, 3, 4])).by((i) => i % 2).asEntries(), [
      { key: 0, items: [0, 2, 4] },
      { key: 1, items: [1, 3] }
    ])
  })

  it('supports Map as input', function () {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'a']])
    assert.deepStrictEqual(group(map).by((e) => e[1]).asEntries(), [
      { key: 'a', items: [[1, 'a'], [3, 'a']] },
      { key: 'b', items: [[2, 'b']] }
    ])
  })
})

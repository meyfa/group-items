import assert from 'node:assert'
import { asEntriesFactory } from '../../src/collectors/as-entries.js'

describe('collectors/as-entries.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = asEntriesFactory([])
    assert.deepStrictEqual(collector(), [])
  })

  it('returns array of entries', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector(), [
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
  })

  it('ignores empty options object', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector({}), [
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
  })

  it('allows specifying keyName option', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector({ keyName: 'foo' }), [
      { foo: 1, items: [1, 2, 3] },
      { foo: 2, items: [4, 5, 6] }
    ])
  })

  it('allows specifying itemsName option', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector({ itemsName: 'bar' }), [
      { key: 1, bar: [1, 2, 3] },
      { key: 2, bar: [4, 5, 6] }
    ])
  })

  it('allows specifying both keyName and itemsName options', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    assert.deepStrictEqual(collector({ keyName: 'foo', itemsName: 'bar' }), [
      { foo: 1, bar: [1, 2, 3] },
      { foo: 2, bar: [4, 5, 6] }
    ])
  })
})

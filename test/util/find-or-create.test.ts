import assert from 'assert'
import { findOrCreate } from '../../src/util/find-or-create.js'

describe('util/find-or-create.ts', function () {
  describe('match', function () {
    it('returns first match', function () {
      const arr = [1, 2, 3, 4, 5, 6]
      assert.strictEqual(findOrCreate(arr, (i) => i % 2 === 0, () => 42), 2)
    })

    it('leaves array intact on match', function () {
      const arr = [1, 2, 3, 4, 5, 6]
      findOrCreate(arr, (i) => i % 2 === 0, () => 42)
      assert.deepStrictEqual(arr, [1, 2, 3, 4, 5, 6])
    })

    it('does not call construct on match', function (done) {
      const arr = [1, 2, 3, 4, 5, 6]
      findOrCreate(arr, (i) => i % 2 === 0, () => {
        done(new Error('called'))
        return 0
      })
      done()
    })

    it('matches even if match is falsy', function () {
      const arr = [1, 2, 0, 3]
      assert.strictEqual(findOrCreate(arr, (i) => i === 0, () => 42), 0)
      assert.deepStrictEqual(arr, [1, 2, 0, 3])
    })

    it('matches even if match is literal undefined', function () {
      const arr = [undefined]
      assert.strictEqual(findOrCreate(arr, () => true, () => 42), undefined)
      assert.deepStrictEqual(arr, [undefined])
    })
  })

  describe('no match', function () {
    it('returns constructed item if none match', function () {
      const arr = [1, 2, 3, 4, 5, 6]
      assert.strictEqual(findOrCreate(arr, () => false, () => 42), 42)
    })

    it('appends constructed item to array', function () {
      const arr = [1, 2, 3, 4, 5, 6]
      findOrCreate(arr, () => false, () => 42)
      assert.deepStrictEqual(arr, [1, 2, 3, 4, 5, 6, 42])
    })

    it('always constructs if array is empty', function () {
      const arr: number[] = []
      assert.strictEqual(findOrCreate(arr, () => true, () => 42), 42)
      assert.deepStrictEqual(arr, [42])
    })
  })
})

import { expect } from 'chai'

import { findOrCreate } from '../../src/util/find-or-create.js'

const generateMap = (): Map<number, number> => new Map<number, number>()
  .set(1, 1)
  .set(2, 2)
  .set(3, 3)
  .set(4, 4)
  .set(5, 5)
  .set(6, 6)

describe('util/find-or-create.ts', function () {
  describe('match', function () {
    it('returns first match', function () {
      const arr = generateMap()
      expect(findOrCreate(arr, 2, () => 42)).to.equal(2)
    })

    it('leaves array intact on match', function () {
      const arr = generateMap()
      findOrCreate(arr, 2, () => 42)
      expect(arr).to.deep.equal(generateMap())
    })

    it('does not call construct on match', function (done) {
      const arr = generateMap()
      findOrCreate(arr, 2, () => {
        done(new Error('called'))
        return 0
      })
      done()
    })

    it('matches even if match is falsy', function () {
      const arr = new Map()
        .set(1, 1)
        .set(2, 2)
        .set(0, 0)
        .set(3, 3)
      expect(findOrCreate(arr, 0, () => 42)).to.equal(0)
      expect(arr).to.deep.equal(new Map()
        .set(1, 1)
        .set(2, 2)
        .set(0, 0)
        .set(3, 3))
    })

    it('matches even if match is literal undefined', function () {
      const arr = new Map()
        .set(42, undefined)
      expect(findOrCreate(arr, 42, () => 42)).to.be.undefined
      expect(arr).to.deep.equal(new Map().set(42, undefined))
    })
  })

  describe('no match', function () {
    it('returns constructed item if none match', function () {
      const arr = generateMap()
      expect(findOrCreate(arr, undefined, () => 42)).to.equal(42)
    })

    it('appends constructed item to array', function () {
      const arr = generateMap()
      findOrCreate(arr, 42, () => 42)
      expect(arr).to.deep.equal(generateMap()
        .set(42, 42))
    })

    it('always constructs if array is empty', function () {
      const arr = new Map()

      expect(findOrCreate(arr, undefined, () => 42)).to.equal(42)
      expect(arr).to.deep.equal(new Map().set(undefined, 42))
    })
  })
})

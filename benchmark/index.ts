import { faker } from '@faker-js/faker'
import { group } from '../src/index.js'

// random seed, but hardcoded to make benchmarks reproducible
faker.seed(6676776800545831)

const sampleData = {
  numbers10k: Array.from({ length: 10_000 }, (_, i) => i),
  numbers100k: Array.from({ length: 100_000 }, (_, i) => i),
  objects: Array.from({ length: 10_000 }, () => ({
    cellName: faker.music.genre(),
    name: faker.name.fullName(),
    test: faker.lorem.paragraph()
  })),
  objectKeys100: Array.from({ length: 100 }, () => ({
    date: {
      year: 2022,
      month: faker.datatype.number({ min: 0, max: 11 }),
      day: faker.datatype.number({ min: 1, max: 31 })
    },
    payload: faker.datatype.array(10)
  })),
  objectKeys1000: Array.from({ length: 1_000 }, () => ({
    date: {
      year: 2022,
      month: faker.datatype.number({ min: 0, max: 11 }),
      day: faker.datatype.number({ min: 1, max: 31 })
    },
    payload: faker.datatype.array(10)
  }))
}

benchmark('remainder-10k', 1000, () => {
  group(sampleData.numbers10k).by((num) => num % 100).asArrays()
})

benchmark('remainder-100k', 100, () => {
  group(sampleData.numbers100k).by((num) => num % 100).asArrays()
})

benchmark('object-attribute', 1000, () => {
  group(sampleData.objects).by('cellName').asObject()
})

benchmark('object-callback', 1000, () => {
  group(sampleData.objects).by((obj) => obj.cellName).asObject()
})

benchmark('complex-key-100', 200, () => {
  group(sampleData.objectKeys100).by('date').asArrays()
})

benchmark('complex-key-1000', 20, () => {
  group(sampleData.objectKeys1000).by('date').asArrays()
})

/**
 * Run a benchmark.
 *
 * @param name Name of the benchmark.
 * @param samples Number of samples to run.
 * @param fn Function to benchmark.
 */
function benchmark (name: string, samples: number, fn: () => void): void {
  console.log(`Benchmarking ${name} (${samples} samples)`)
  const runs = [0, 1, 2, 4, 5].map(() => computeBenchmark(name, samples, fn)).sort((a, b) => a - b)
  // take the middle value to avoid outliers
  const duration = runs[2]
  const total = duration.toFixed(3)
  const average = (duration / samples).toFixed(3)
  const ops = (samples / (duration / 1000)).toFixed(2)
  console.log(`total: ${total}ms, average: ${average}ms, ops/s: ${ops}`)
  console.log()
}

/**
 * Perform a single benchmark run, returning the duration in milliseconds.
 *
 * @param name Name of the benchmark.
 * @param samples Number of samples to run.
 * @param fn Function to benchmark.
 * @returns Duration in milliseconds.
 */
function computeBenchmark (name: string, samples: number, fn: () => void): number {
  const startMark = performance.mark(`${name}-start`)
  for (let i = 0; i < samples; ++i) {
    fn()
  }
  const endMark = performance.mark(`${name}-end`)
  const measure = performance.measure(name, startMark.name, endMark.name)
  performance.clearMarks(startMark.name)
  performance.clearMarks(endMark.name)
  performance.clearMeasures(measure.name)
  return measure.duration
}

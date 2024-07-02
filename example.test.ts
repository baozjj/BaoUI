import { describe, test, vi, expect, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('function', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })


  test('mock request', async () => {
    mockedAxios.get.mockImplementation(() => {
      return Promise.resolve({
        data: {
          name: 'vitest',
          age: 18
        }
      })
    })
    const data = await request()
    expect(data).toEqual({
      name: 'vitest',
      age: 18
    })
  })
})
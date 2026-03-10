/**
 * Promise.try() polyfill
 * ES2025 新特性 - 用于安全地启动 Promise 链
 * @see https://github.com/tc39/proposal-promise-try
 */

if (typeof Promise.try !== 'function') {
  Promise.try = function <T>(fn: () => T | PromiseLike<T>): Promise<T> {
    try {
      return Promise.resolve(fn())
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export {}
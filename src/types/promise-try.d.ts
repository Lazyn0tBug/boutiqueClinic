/**
 * Promise.try() type declaration
 * ES2025 feature - see https://github.com/tc39/proposal-promise-try
 */

interface PromiseConstructor {
  /**
   * Wraps a callback function in a promise, allowing promise-style handling of both
   * synchronous and asynchronous errors.
   *
   * @param fn - The function to wrap
   * @returns A Promise that resolves with the return value of fn, or rejects with its thrown error
   */
  try<T>(fn: () => T | PromiseLike<T>): Promise<T>
}

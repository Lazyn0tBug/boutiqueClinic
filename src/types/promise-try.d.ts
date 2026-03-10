/**
 * Promise.try() 类型声明
 * ES2025 新特性 - 用于安全地启动 Promise 链
 * @see https://github.com/tc39/proposal-promise-try
 */

interface PromiseConstructor {
  /**
   * 接受一个函数并返回一个 Promise。
   * 如果函数抛出异常，Promise 将被拒绝。
   * 如果函数返回值，Promise 将被解决。
   * 
   * @param fn 要执行的函数
   * @returns 一个 Promise，根据函数执行结果解决或拒绝
   */
  try<T>(fn: () => T | PromiseLike<T>): Promise<T>
}
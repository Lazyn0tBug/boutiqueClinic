/**
 * 统一存储模块
 * H5 本地存储库 - 自动选择 IndexedDB 或 localStorage
 * 为医疗诊所应用提供可靠的本地存储方案
 */

import { storage, StorageKeys, type StorageKey, type StorageValue } from './storage'

/**
 * 检测 IndexedDB 是否可用
 */
function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') return false
  if (!window.indexedDB) return false

  try {
    // 尝试打开一个测试数据库
    const request = window.indexedDB.open('test')
    request.addEventListener('error', () => false)
    return true
  } catch {
    return false
  }
}

/**
 * LocalStorage 回退实现
 * 在不支持 IndexedDB 的环境中提供兼容方案
 */
class LocalStorageFallback {
  readonly #prefix = 'clinic:'

  async get<T = unknown>(key: StorageKey): Promise<T | undefined> {
    if (typeof localStorage === 'undefined') return undefined

    try {
      const item = localStorage.getItem(this.#prefix + key)
      if (!item) return undefined

      const stored: StorageValue<T> = JSON.parse(item)

      // 检查是否过期
      if (stored.expires != null && Date.now() > stored.expires) {
        await this.delete(key)
        return undefined
      }

      return stored.data
    } catch (error) {
      console.error(`[LocalStorage] Failed to get key "${key}":`, error)
      return undefined
    }
  }

  async set<T = unknown>(key: StorageKey, value: T, ttl?: number): Promise<void> {
    if (typeof localStorage === 'undefined') return

    try {
      const storageValue: StorageValue<T> = {
        data: value,
        timestamp: Date.now(),
        expires: ttl != null ? Date.now() + ttl : undefined,
      }
      localStorage.setItem(this.#prefix + key, JSON.stringify(storageValue))
    } catch (error) {
      console.error(`[LocalStorage] Failed to set key "${key}":`, error)
      throw error
    }
  }

  async delete(key: StorageKey): Promise<void> {
    if (typeof localStorage === 'undefined') return

    try {
      localStorage.removeItem(this.#prefix + key)
    } catch (error) {
      console.error(`[LocalStorage] Failed to delete key "${key}":`, error)
      throw error
    }
  }

  async clear(): Promise<void> {
    if (typeof localStorage === 'undefined') return

    try {
      // 只清除带前缀的键
      const keysToRemove = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))
        .filter((key): key is string => key?.startsWith(this.#prefix) ?? false)

      for (const key of keysToRemove) {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.error('[LocalStorage] Failed to clear storage:', error)
      throw error
    }
  }

  async has(key: StorageKey): Promise<boolean> {
    const value = await this.get(key)
    return value !== undefined
  }

  async keys(): Promise<readonly string[]> {
    if (typeof localStorage === 'undefined') return []

    return Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))
      .filter((key): key is string => key?.startsWith(this.#prefix) ?? false)
      .map((key) => key.slice(this.#prefix.length))
  }

  async getStorageInfo(): Promise<Readonly<{ keyCount: number; estimatedSize: number }>> {
    const allKeys = await this.keys()
    let estimatedSize = 0

    for (const key of allKeys) {
      const value = await this.get(key as StorageKey)
      if (value !== undefined) {
        estimatedSize += JSON.stringify(value).length
      }
    }

    return { keyCount: allKeys.length, estimatedSize }
  }
}

/**
 * 统一存储接口类型
 */
interface IStorage {
  get<T = unknown>(key: StorageKey): Promise<T | undefined>
  set<T = unknown>(key: StorageKey, value: T, ttl?: number): Promise<void>
  delete(key: StorageKey): Promise<void>
  clear(): Promise<void>
  has(key: StorageKey): Promise<boolean>
  keys(): Promise<readonly string[] | readonly IDBValidKey[]>
  getStorageInfo(): Promise<Readonly<{ keyCount: number; estimatedSize: number }>>
}

/**
 * 统一存储类
 * 自动选择 IndexedDB 或 localStorage 作为后端
 */
class UnifiedStorage implements IStorage {
  readonly #backend: IStorage
  readonly #useIndexedDB: boolean

  constructor() {
    this.#useIndexedDB = isIndexedDBAvailable()
    this.#backend = this.#useIndexedDB ? storage : new LocalStorageFallback()

    if (!this.#useIndexedDB) {
      console.warn('[Storage] IndexedDB not available, falling back to localStorage')
    }
  }

  async get<T = unknown>(key: StorageKey): Promise<T | undefined> {
    return this.#backend.get<T>(key)
  }

  async set<T = unknown>(key: StorageKey, value: T, ttl?: number): Promise<void> {
    return this.#backend.set(key, value, ttl)
  }

  async delete(key: StorageKey): Promise<void> {
    return this.#backend.delete(key)
  }

  async clear(): Promise<void> {
    return this.#backend.clear()
  }

  async has(key: StorageKey): Promise<boolean> {
    return this.#backend.has(key)
  }

  async keys(): Promise<readonly string[]> {
    const result = await this.#backend.keys()
    return result.map((k) => (typeof k === 'string' ? k : JSON.stringify(k)))
  }

  async getStorageInfo(): Promise<Readonly<{ keyCount: number; estimatedSize: number }>> {
    return this.#backend.getStorageInfo()
  }

  /**
   * 是否使用 IndexedDB
   */
  isUsingIndexedDB(): boolean {
    return this.#useIndexedDB
  }

  /**
   * 获取后端类型
   */
  getBackendType(): 'indexeddb' | 'localstorage' | 'none' {
    if (this.#useIndexedDB) return 'indexeddb'
    if (typeof localStorage !== 'undefined') return 'localstorage'
    return 'none'
  }

  /**
   * 获取多个值
   */
  async getMany<T = unknown>(
    keys: readonly StorageKey[],
  ): Promise<ReadonlyMap<StorageKey, T | undefined>> {
    const results = new Map<StorageKey, T | undefined>()
    await Promise.all(
      keys.map(async (key) => {
        const value = await this.get<T>(key)
        results.set(key, value)
      }),
    )
    return results
  }

  /**
   * 设置多个值
   */
  async setMany(entries: readonly [StorageKey, unknown][], ttl?: number): Promise<void> {
    await Promise.all(entries.map(([key, value]) => this.set(key, value, ttl)))
  }

  /**
   * 导出所有数据（用于备份）
   */
  async exportAll(): Promise<Readonly<Record<string, unknown>>> {
    const allKeys = await this.keys()
    const entries = await Promise.all(
      allKeys.map(async (key) => {
        const value = await this.get(key as StorageKey)
        return [key, value] as const
      }),
    )

    return Object.fromEntries(entries.filter(([, v]) => v !== undefined))
  }

  /**
   * 导入数据（用于恢复）
   */
  async importAll(data: Readonly<Record<string, unknown>>): Promise<void> {
    const entries = Object.entries(data) as [StorageKey, unknown][]
    await this.setMany(entries)
  }
}

// 创建统一存储实例
export const unifiedStorage = new UnifiedStorage()

// 默认导出
export default unifiedStorage

// 重新导出
export { StorageKeys }
export type { StorageKey, StorageValue }
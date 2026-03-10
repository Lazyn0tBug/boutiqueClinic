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
  private prefix = 'clinic:'

  async get<T = any>(key: StorageKey): Promise<T | undefined> {
    if (typeof localStorage === 'undefined') return undefined

    try {
      const item = localStorage.getItem(this.prefix + key)
      if (!item) return undefined

      const stored: StorageValue<T> = JSON.parse(item)

      // 检查是否过期
      if (stored.expires && Date.now() > stored.expires) {
        await this.delete(key)
        return undefined
      }

      return stored.data
    } catch (error) {
      console.error(`[LocalStorage] Failed to get key "${key}":`, error)
      return undefined
    }
  }

  async set<T = any>(key: StorageKey, value: T, ttl?: number): Promise<void> {
    if (typeof localStorage === 'undefined') return

    try {
      const storageValue: StorageValue<T> = {
        data: value,
        timestamp: Date.now(),
        expires: ttl ? Date.now() + ttl : undefined,
      }
      localStorage.setItem(this.prefix + key, JSON.stringify(storageValue))
    } catch (error) {
      console.error(`[LocalStorage] Failed to set key "${key}":`, error)
      throw error
    }
  }

  async delete(key: StorageKey): Promise<void> {
    if (typeof localStorage === 'undefined') return

    try {
      localStorage.removeItem(this.prefix + key)
    } catch (error) {
      console.error(`[LocalStorage] Failed to delete key "${key}":`, error)
      throw error
    }
  }

  async clear(): Promise<void> {
    if (typeof localStorage === 'undefined') return

    try {
      // 只清除带前缀的键
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key))
    } catch (error) {
      console.error('[LocalStorage] Failed to clear storage:', error)
      throw error
    }
  }

  async has(key: StorageKey): Promise<boolean> {
    const value = await this.get(key)
    return value !== undefined
  }

  async keys(): Promise<string[]> {
    if (typeof localStorage === 'undefined') return []

    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.substring(this.prefix.length))
      }
    }
    return keys
  }

  async getStorageInfo(): Promise<{ keyCount: number; estimatedSize: number }> {
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
  get<T = any>(key: StorageKey): Promise<T | undefined>
  set<T = any>(key: StorageKey, value: T, ttl?: number): Promise<void>
  delete(key: StorageKey): Promise<void>
  clear(): Promise<void>
  has(key: StorageKey): Promise<boolean>
  keys(): Promise<string[] | IDBValidKey[]>
  getStorageInfo(): Promise<{ keyCount: number; estimatedSize: number }>
}

/**
 * 统一存储类
 * 自动选择 IndexedDB 或 localStorage 作为后端
 */
class UnifiedStorage implements IStorage {
  private backend: IStorage
  private useIndexedDB: boolean

  constructor() {
    this.useIndexedDB = isIndexedDBAvailable()
    this.backend = this.useIndexedDB ? storage : new LocalStorageFallback()

    if (!this.useIndexedDB) {
      console.warn('[Storage] IndexedDB not available, falling back to localStorage')
    }
  }

  async get<T = any>(key: StorageKey): Promise<T | undefined> {
    return this.backend.get<T>(key)
  }

  async set<T = any>(key: StorageKey, value: T, ttl?: number): Promise<void> {
    return this.backend.set(key, value, ttl)
  }

  async delete(key: StorageKey): Promise<void> {
    return this.backend.delete(key)
  }

  async clear(): Promise<void> {
    return this.backend.clear()
  }

  async has(key: StorageKey): Promise<boolean> {
    return this.backend.has(key)
  }

  async keys(): Promise<string[]> {
    const result = await this.backend.keys()
    return result.map((k) => (typeof k === 'string' ? k : JSON.stringify(k)))
  }

  async getStorageInfo(): Promise<{ keyCount: number; estimatedSize: number }> {
    return this.backend.getStorageInfo()
  }

  /**
   * 是否使用 IndexedDB
   */
  isUsingIndexedDB(): boolean {
    return this.useIndexedDB
  }

  /**
   * 获取后端类型
   */
  getBackendType(): 'indexeddb' | 'localstorage' | 'none' {
    if (this.useIndexedDB) return 'indexeddb'
    if (typeof localStorage !== 'undefined') return 'localstorage'
    return 'none'
  }

  /**
   * 获取多个值
   */
  async getMany<T = any>(keys: StorageKey[]): Promise<Map<StorageKey, T | undefined>> {
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
  async setMany(entries: Array<[StorageKey, any]>, ttl?: number): Promise<void> {
    await Promise.all(entries.map(([key, value]) => this.set(key, value, ttl)))
  }

  /**
   * 导出所有数据（用于备份）
   */
  async exportAll(): Promise<Record<string, any>> {
    const allKeys = await this.keys()
    const data: Record<string, any> = {}

    for (const key of allKeys) {
      const value = await this.get(key as StorageKey)
      if (value !== undefined) {
        data[key] = value
      }
    }

    return data
  }

  /**
   * 导入数据（用于恢复）
   */
  async importAll(data: Record<string, any>): Promise<void> {
    const entries = Object.entries(data) as Array<[StorageKey, any]>
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
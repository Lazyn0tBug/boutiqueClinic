/**
 * 本地存储模块
 * 基于 IndexedDB (idb-keyval) 的统一存储接口
 * 提供比 localStorage 更好的性能和更大的存储容量
 */

import { get, set, del, clear, keys as getKeys, createStore } from 'idb-keyval'

// 存储键名常量 - 针对医疗诊所应用
export const StorageKeys = {
  // 应用设置
  APP_THEME: 'app:theme',
  APP_LANGUAGE: 'app:language',
  APP_SIDEBAR_COLLAPSED: 'app:sidebar-collapsed',
  APP_PREFERENCES: 'app:preferences',

  // 用户数据
  USER_PROFILE: 'user:profile',
  USER_TOKEN: 'user:token',
  USER_PREFERENCES: 'user:preferences',
  USER_BOOKMARKS: 'user:bookmarks',

  // 预约相关
  BOOKING_HISTORY: 'booking:history',
  BOOKING_DRAFT: 'booking:draft',
  BOOKING_PREFERENCES: 'booking:preferences',

  // 问诊相关
  CONSULTATION_HISTORY: 'consultation:history',
  CONSULTATION_DRAFT: 'consultation:draft',

  // 药品相关
  PHARMACY_FAVORITES: 'pharmacy:favorites',
  PHARMACY_HISTORY: 'pharmacy:history',

  // 搜索历史
  SEARCH_HISTORY: 'search:history',

  // 缓存数据
  CACHE_DOCTORS: 'cache:doctors',
  CACHE_SERVICES: 'cache:services',
  CACHE_PARTNERS: 'cache:partners',
  CACHE_TIMESTAMP: 'cache:timestamp',
} as const

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys]

// 延迟初始化存储实例（避免在模块加载时访问 IndexedDB）
let clinicStore: ReturnType<typeof createStore> | null = null

function getStore() {
  clinicStore ??= createStore('boutique-clinic-db', 'clinic-store')
  return clinicStore
}

/**
 * 存储值类型定义
 */
export interface StorageValue<T> {
  data: T
  timestamp: number
  expires?: number // 过期时间戳（可选）
}

/**
 * 存储管理器类
 * 使用现代私有字段语法
 */
class StorageManager {
  readonly #memoryCache = new Map<string, unknown>()
  #cacheEnabled = true

  private get store() {
    return getStore()
  }

  /**
   * 获取存储的值
   */
  async get<T = unknown>(key: StorageKey): Promise<T | undefined> {
    // 先检查内存缓存
    if (this.#cacheEnabled && this.#memoryCache.has(key)) {
      return this.#memoryCache.get(key) as T
    }

    try {
      const stored = await get<StorageValue<T>>(key, this.store)

      if (stored === undefined) {
        return undefined
      }

      // 检查是否过期
      if (stored.expires != null && Date.now() > stored.expires) {
        await this.delete(key)
        return undefined
      }

      // 更新内存缓存
      if (this.#cacheEnabled) {
        this.#memoryCache.set(key, stored.data)
      }

      return stored.data
    } catch (error) {
      console.error(`[Storage] Failed to get key "${key}":`, error)
      return undefined
    }
  }

  /**
   * 设置存储的值
   * @param key 存储键
   * @param value 存储值
   * @param ttl 过期时间（毫秒）
   */
  async set<T = unknown>(key: StorageKey, value: T, ttl?: number): Promise<void> {
    try {
      const storageValue: StorageValue<T> = {
        data: value,
        timestamp: Date.now(),
        expires: ttl != null ? Date.now() + ttl : undefined,
      }

      await set(key, storageValue, this.store)

      // 更新内存缓存
      if (this.#cacheEnabled) {
        this.#memoryCache.set(key, value)
      }
    } catch (error) {
      console.error(`[Storage] Failed to set key "${key}":`, error)
      throw error
    }
  }

  /**
   * 删除存储的值
   */
  async delete(key: StorageKey): Promise<void> {
    try {
      await del(key, this.store)

      // 清除内存缓存
      this.#memoryCache.delete(key)
    } catch (error) {
      console.error(`[Storage] Failed to delete key "${key}":`, error)
      throw error
    }
  }

  /**
   * 清空所有存储
   */
  async clear(): Promise<void> {
    try {
      await clear(this.store)

      // 清空内存缓存
      this.#memoryCache.clear()
    } catch (error) {
      console.error('[Storage] Failed to clear storage:', error)
      throw error
    }
  }

  /**
   * 获取所有键名
   */
  async keys(): Promise<readonly IDBValidKey[]> {
    try {
      return await getKeys(this.store)
    } catch (error) {
      console.error('[Storage] Failed to get keys:', error)
      return []
    }
  }

  /**
   * 检查键是否存在
   */
  async has(key: StorageKey): Promise<boolean> {
    const value = await this.get(key)
    return value !== undefined
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
  async setMany(
    entries: readonly [StorageKey, unknown][],
    ttl?: number,
  ): Promise<void> {
    await Promise.all(entries.map(([key, value]) => this.set(key, value, ttl)))
  }

  /**
   * 启用/禁用内存缓存
   */
  setCacheEnabled(enabled: boolean): void {
    this.#cacheEnabled = enabled
    if (!enabled) {
      this.#memoryCache.clear()
    }
  }

  /**
   * 获取缓存状态
   */
  get cacheEnabled(): boolean {
    return this.#cacheEnabled
  }

  /**
   * 清空内存缓存
   */
  clearCache(): void {
    this.#memoryCache.clear()
  }

  /**
   * 获取存储使用情况（估算）
   */
  async getStorageInfo(): Promise<Readonly<{ keyCount: number; estimatedSize: number }>> {
    try {
      const allKeys = await this.keys()
      let estimatedSize = 0

      // 估算大小（简单方法）
      for (const key of allKeys) {
        const value = await this.get(key as StorageKey)
        if (value !== undefined) {
          estimatedSize += JSON.stringify(value).length
        }
      }

      return {
        keyCount: allKeys.length,
        estimatedSize,
      }
    } catch (error) {
      console.error('[Storage] Failed to get storage info:', error)
      return { keyCount: 0, estimatedSize: 0 }
    }
  }

  /**
   * 导出所有数据（用于备份）
   */
  async exportAll(): Promise<Readonly<Record<string, unknown>>> {
    try {
      const allKeys = await this.keys()
      const entries = await Promise.all(
        allKeys.map(async (key) => {
          const value = await this.get(key as StorageKey)
          const keyStr = typeof key === 'string' ? key : JSON.stringify(key)
          return [keyStr, value] as const
        }),
      )

      return Object.fromEntries(entries.filter(([, v]) => v !== undefined))
    } catch (error) {
      console.error('[Storage] Failed to export data:', error)
      return {}
    }
  }

  /**
   * 导入数据（用于恢复）
   */
  async importAll(data: Readonly<Record<string, unknown>>): Promise<void> {
    try {
      const entries = Object.entries(data) as [StorageKey, unknown][]
      await this.setMany(entries)
    } catch (error) {
      console.error('[Storage] Failed to import data:', error)
      throw error
    }
  }

  /**
   * 获取原始存储值（包含元数据）
   */
  async getRaw<T = unknown>(key: StorageKey): Promise<StorageValue<T> | undefined> {
    try {
      return await get<StorageValue<T>>(key, this.store)
    } catch (error) {
      console.error(`[Storage] Failed to get raw key "${key}":`, error)
      return undefined
    }
  }
}

// 创建单例实例
export const storage = new StorageManager()

// 默认导出
export default storage

/**
 * 便捷函数
 */
export const getStorage = <T = unknown>(key: StorageKey) => storage.get<T>(key)
export const setStorage = <T = unknown>(key: StorageKey, value: T, ttl?: number) =>
  storage.set(key, value, ttl)
export const deleteStorage = (key: StorageKey) => storage.delete(key)
export const clearStorage = () => storage.clear()
export const hasStorage = (key: StorageKey) => storage.has(key)
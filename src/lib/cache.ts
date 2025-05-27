interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class Cache {
  private storage: Map<string, CacheItem<any>>;
  private readonly defaultExpiry = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.storage = new Map();
  }

  set<T>(key: string, data: T, expiry = this.defaultExpiry): void {
    this.storage.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }

  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.expiry) {
      this.storage.delete(key);
      return null;
    }

    return item.data as T;
  }

  clear(): void {
    this.storage.clear();
  }
}

export const cache = new Cache();

export function setupCache(): void {
  // Clear cache on auth state change
  window.addEventListener('storage', (e) => {
    if (e.key === 'dustbeaters_auth') {
      cache.clear();
    }
  });
}
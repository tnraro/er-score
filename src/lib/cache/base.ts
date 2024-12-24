export abstract class CacheBase {
  abstract id(): string;
  abstract get<T>(key: string): Promise<T | undefined | null>;
  abstract set<T>(key: string, value: T): Promise<void>;
  abstract delete(key: string): Promise<void>;
}

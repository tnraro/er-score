export class ExclusiveLock {
  #locked = false;
  get locked() {
    return this.#locked;
  }
  lock() {
    if (this.#locked) return false;
    this.#locked = true;
    return true;
  }
  unlock() {
    this.#locked = false;
  }
  static withAsync<Arguments extends unknown[], ReturnValue>(
    wrappedFunction: (...args: Arguments) => Promise<ReturnValue>,
    options?: {
      lock?: ExclusiveLock;
    },
  ) {
    const lock = options?.lock ?? new ExclusiveLock();
    return async (...args: Arguments): Promise<ReturnValue> => {
      if (!lock.lock()) return Promise.reject(new Error("lock already held"));
      try {
        return await wrappedFunction(...args);
      } finally {
        lock.unlock();
      }
    };
  }
}

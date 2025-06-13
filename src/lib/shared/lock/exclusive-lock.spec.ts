import { sleep } from "$lib/utils/time/sleep";
import { describe, expect, it, vi } from "vitest";
import { ExclusiveLock } from "./exclusive-lock";

it("should lock and unlock", async () => {
  const lock = new ExclusiveLock();

  expect(lock.locked).toBe(false);
  expect(lock.lock()).toBe(true);
  expect(lock.locked).toBe(true);
  expect(lock.lock()).toBe(false);
  expect(lock.lock()).toBe(false);
  lock.unlock();
  expect(lock.locked).toBe(false);
});

describe("withAsync", () => {
  it("should lock and unlock", async () => {
    const fn = vi.fn(() => sleep(1));
    const lock = new ExclusiveLock();
    const wrappedFn = ExclusiveLock.withAsync(fn, { lock });
    expect(lock.locked).toBe(false);

    const promise = wrappedFn();
    expect(lock.locked).toBe(true);
    expect(fn).toHaveBeenCalledTimes(1);

    const rejectedPromise = wrappedFn();
    expect(lock.locked).toBe(true);
    await expect(rejectedPromise).rejects.toThrow("lock already held");
    expect(fn).toHaveBeenCalledTimes(1);

    await promise;
    expect(lock.locked).toBe(false);

    wrappedFn();
    expect(lock.locked).toBe(true);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should handle error", async () => {
    const fn = vi.fn((message: string) => Promise.reject(new Error(message)));
    const lock = new ExclusiveLock();
    const wrappedFn = ExclusiveLock.withAsync(fn, { lock });
    expect(lock.locked).toBe(false);

    const x = wrappedFn("message");
    expect(lock.locked).toBe(true);

    await expect(x).rejects.toThrow("message");
    expect(lock.locked).toBe(false);
  });
});

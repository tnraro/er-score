export async function measureTime<R>(name: string, fn: () => Promise<R>): Promise<R> {
  const now = performance.now();
  try {
    const result = await fn();
    return result;
  } finally {
    console.info(`${name}\t${(performance.now() - now).toPrecision(4)}ms`);
  }
}

export async function measureFnTime<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  ...args: Args
): Promise<R> {
  const name = fn.name;
  return await measureTime(name, () => fn(...args));
}

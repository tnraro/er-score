export async function measureTime<R>(name: string, fn: () => Promise<R>): Promise<R> {
  const now = performance.now();
  try {
    const result = await fn();
    return result;
  } finally {
    console.info(`${name}\t${(performance.now() - now).toPrecision(4)}ms`);
  }
}

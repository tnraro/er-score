export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(ms, 0)));
}

export async function measureTime<R>(name: string, fn: () => Promise<R>): Promise<R> {
  const now = performance.now();
  try {
    const result = await fn();
    console.info(`${name}\t${(performance.now() - now).toPrecision(4)}ms`);
    return result;
  } catch (error) {
    console.error(`${name}\t${(performance.now() - now).toPrecision(4)}ms`);
    throw error;
  }
}

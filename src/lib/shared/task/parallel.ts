export async function parallel<T>(tasks: Promise<T>[]): Promise<[T[], unknown[]]> {
  const results = await Promise.allSettled(tasks);
  const passes = [];
  const errors = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      passes.push(result.value);
    } else {
      errors.push(result.reason);
    }
  }
  return [passes, errors];
}

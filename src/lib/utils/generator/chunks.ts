export function* chunks(start: number, end: number, chunkSize: number) {
  for (let j = start; j <= end; j += chunkSize) {
    const a = j;
    const b = Math.min(j + chunkSize - 1, end);
    yield [a, b];
  }
}

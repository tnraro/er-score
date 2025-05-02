import { expect, it } from "vitest";
import { chunks } from "./chunks";

it("should generate chunks of a given size", () => {
  const start = 0;
  const end = 10;
  const chunkSize = 3;
  const result = [...chunks(start, end, chunkSize)];
  expect(result).toEqual([
    [0, 2],
    [3, 5],
    [6, 8],
    [9, 10],
  ]);
});

it("should generate chunks of a given size when end-start+1 is divisible by chunkSize", () => {
  const start = 0;
  const end = 11;
  const chunkSize = 4;
  const result = [...chunks(start, end, chunkSize)];
  expect(result).toEqual([
    [0, 3],
    [4, 7],
    [8, 11],
  ]);
});

it("should handle cases where the end is less than the start", () => {
  const start = 10;
  const end = 5;
  const chunkSize = 3;
  const result = [...chunks(start, end, chunkSize)];
  expect(result).toEqual([]);
});

it("should handle cases where the end is equal to the start", () => {
  const start = 5;
  const end = 5;
  const chunkSize = 5;
  const result = [...chunks(start, end, chunkSize)];
  expect(result).toEqual([[5, 5]]);
});

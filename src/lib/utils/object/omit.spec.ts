import { expect, it } from "vitest";
import { omit } from "./omit";

it("should create a new object, even if no keys are provided", () => {
  const obj = { a: 5, b: 3 };
  const result = omit(obj, []);

  expect(result).not.toBe(obj);
});

it("should be equivalent to the original object if no keys are provided", () => {
  const obj = { a: 5, b: 3 };
  const result = omit(obj, []);
  expect(result).toStrictEqual(obj);
});

it("should omit specified keys from the object", () => {
  const obj = { a: 5, b: 3, c: 7 };
  const result = omit(obj, ["b", "c"]);
  expect(result).toStrictEqual({ a: 5 });
});
it("delete not exist key", () => {
  const obj = { a: 5, b: 3, c: 7 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = omit(obj, ["d"] as any);
  expect(result).toStrictEqual(obj);
});

import { expect, it } from "vitest";
import { pick } from "./pick";

it("should create a empty object, if no keys are provided", () => {
  const obj = { a: 5, b: 3 };
  const result = pick(obj, []);

  expect(result).not.toBe({});
});

it("should pick specified keys from the object", () => {
  const obj = { a: 5, b: 3, c: 7 };
  const result = pick(obj, ["b", "c"]);
  expect(result).toStrictEqual({ b: 3, c: 7 });
});

it("pick not existing keys should ignore them", () => {
  const obj = { a: 5, b: 3, c: 7 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = pick(obj, ["b", "d"] as any);
  expect(result).toStrictEqual({ b: 3 });
});

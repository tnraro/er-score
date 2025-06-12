import { expect, it } from "vitest";
import { diff } from "./diff";

it("should detect added content", () => {
  const oldObject = { a: 5 };
  const newObject = { a: 5, b: 3 };
  expect(diff(oldObject, newObject)).toStrictEqual([{ type: "add", key: "b", value: 3 }]);
});

it("should detect removed content", () => {
  const oldObject = { a: 5, b: 3 };
  const newObject = { a: 5 };
  expect(diff(oldObject, newObject)).toStrictEqual([{ type: "remove", key: "b" }]);
});
it("should detect updated content", () => {
  const oldObject = { a: 5, b: 3 };
  const newObject = { a: 5, b: 4 };
  expect(diff(oldObject, newObject)).toStrictEqual([
    { type: "update", key: "b", oldValue: 3, newValue: 4 },
  ]);
});
it("should detect no changes", () => {
  const oldObject = { a: 5, b: 3 };
  const newObject = { a: 5, b: 3 };
  expect(diff(oldObject, newObject)).toStrictEqual([]);
});

it("should detect complex changes", () => {
  const oldObject = { a: 5, b: 3, c: 3 };
  const newObject = { a: 5, b: 4, d: 1 };
  expect(diff(oldObject, newObject)).toStrictEqual([
    { type: "update", key: "b", oldValue: 3, newValue: 4 },
    { type: "remove", key: "c" },
    { type: "add", key: "d", value: 1 },
  ]);
});
it("should handle diff(null, null)", () => {
  const oldObject = null;
  const newObject = null;
  expect(diff(oldObject, newObject)).toStrictEqual([]);
});
it("should handle diff(undefined, undefined)", () => {
  const oldObject = undefined;
  const newObject = undefined;
  expect(diff(oldObject, newObject)).toStrictEqual([]);
});
it("should handle diff({}, {})", () => {
  const oldObject = {};
  const newObject = {};
  expect(diff(oldObject, newObject)).toStrictEqual([]);
});
it("should handle diff(null, v)", () => {
  const oldObject = null;
  const newObject = { a: 5 };
  expect(diff(oldObject, newObject)).toStrictEqual([{ type: "add", key: "a", value: 5 }]);
});
it("should handle diff(u, null)", () => {
  const oldObject = { a: 5 };
  const newObject = null;
  expect(diff(oldObject, newObject)).toStrictEqual([{ type: "remove", key: "a" }]);
});

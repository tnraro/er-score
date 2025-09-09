import { expect, test } from "vitest";
import { getTier } from "./tier";

test("아4", () => {
  assertTier(-1, "Iron", 0, 4);
  assertTier(0, "Iron", 0, 4);
  assertTier(1, "Iron", 1, 4);
  assertTier(149, "Iron", 149, 4);
});
test("아3", () => {
  assertTier(150, "Iron", 0, 3);
  assertTier(151, "Iron", 1, 3);
  assertTier(299, "Iron", 149, 3);
});
test("아2", () => {
  assertTier(300, "Iron", 0, 2);
  assertTier(449, "Iron", 149, 2);
});
test("아1", () => {
  assertTier(450, "Iron", 0, 1);
  assertTier(599, "Iron", 149, 1);
});
test("브4", () => {
  assertTier(600, "Bronze", 0, 4);
  assertTier(799, "Bronze", 199, 4);
});
test("브3", () => {
  assertTier(800, "Bronze", 0, 3);
  assertTier(999, "Bronze", 199, 3);
});
test("브2", () => {
  assertTier(1000, "Bronze", 0, 2);
  assertTier(1199, "Bronze", 199, 2);
});
test("브1", () => {
  assertTier(1200, "Bronze", 0, 1);
  assertTier(1399, "Bronze", 199, 1);
});
test("실4", () => {
  assertTier(1400, "Silver", 0, 4);
  assertTier(1649, "Silver", 249, 4);
});
test("실3", () => {
  assertTier(1650, "Silver", 0, 3);
  assertTier(1899, "Silver", 249, 3);
});
test("실2", () => {
  assertTier(1900, "Silver", 0, 2);
  assertTier(2149, "Silver", 249, 2);
});
test("실1", () => {
  assertTier(2150, "Silver", 0, 1);
  assertTier(2399, "Silver", 249, 1);
});
test("골4", () => {
  assertTier(2400, "Gold", 0, 4);
});
test("플4", () => {
  assertTier(3600, "Platinum", 0, 4);
});
test("다4", () => {
  assertTier(5000, "Diamond", 0, 4);
});
test("메라", () => {
  assertTier(6400, "Meteorite", 0);
  assertTier(6453, "Meteorite", 53);
});
test("릴", () => {
  assertTier(7100, "Mythril", 0);
  assertTier(7153, "Mythril", 53);
});

function assertTier(rp: number, name: string, reminder: number, step?: number) {
  const t = getTier(rp);
  expect(t.name).toEqual(name);
  expect(t.reminder).toEqual(reminder);
  expect(t.step).toEqual(step);
}

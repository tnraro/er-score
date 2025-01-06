import { expect, test } from "vitest";
import { formatRelativeTime } from "./format-relative-time";

testFormatRelativeTime(1000, "ko", "1초 후");
testFormatRelativeTime(59 * 1000, "ko", "59초 후");
testFormatRelativeTime(59 * 1000 + 999, "ko", "59초 후");
testFormatRelativeTime(60 * 1000, "ko", "1분 후");
testFormatRelativeTime(59 * 60 * 1000, "ko", "59분 후");
testFormatRelativeTime(60 * 60 * 1000, "ko", "1시간 후");
testFormatRelativeTime(23 * 60 * 60 * 1000, "ko", "23시간 후");
testFormatRelativeTime(24 * 60 * 60 * 1000, "ko", "1일 후");
testFormatRelativeTime(6 * 24 * 60 * 60 * 1000, "ko", "6일 후");
testFormatRelativeTime(7 * 24 * 60 * 60 * 1000, "ko", "1주 후");
testFormatRelativeTime(29 * 24 * 60 * 60 * 1000, "ko", "4주 후");
testFormatRelativeTime(30 * 24 * 60 * 60 * 1000, "ko", "1개월 후");
testFormatRelativeTime(364 * 24 * 60 * 60 * 1000, "ko", "12개월 후");
testFormatRelativeTime(365 * 24 * 60 * 60 * 1000, "ko", "1년 후");
testFormatRelativeTime(53 * 365 * 24 * 60 * 60 * 1000, "ko", "53년 후");
testFormatRelativeTime(1000 * 365 * 24 * 60 * 60 * 1000, "ko", "1,000년 후");
testFormatRelativeTime(1000000 * 365 * 24 * 60 * 60 * 1000, "ko", "1,000,000년 후");
testFormatRelativeTime(-1000, "ko", "1초 전");
testFormatRelativeTime(-59 * 1000, "ko", "59초 전");
testFormatRelativeTime(-59 * 1000 - 999, "ko", "59초 전");
testFormatRelativeTime(-60 * 1000, "ko", "1분 전");
testFormatRelativeTime(-59 * 60 * 1000, "ko", "59분 전");
testFormatRelativeTime(-60 * 60 * 1000, "ko", "1시간 전");
testFormatRelativeTime(-23 * 60 * 60 * 1000, "ko", "23시간 전");
testFormatRelativeTime(-24 * 60 * 60 * 1000, "ko", "1일 전");
testFormatRelativeTime(-6 * 24 * 60 * 60 * 1000, "ko", "6일 전");
testFormatRelativeTime(-7 * 24 * 60 * 60 * 1000, "ko", "1주 전");
testFormatRelativeTime(-29 * 24 * 60 * 60 * 1000, "ko", "4주 전");
testFormatRelativeTime(-30 * 24 * 60 * 60 * 1000, "ko", "1개월 전");
testFormatRelativeTime(-364 * 24 * 60 * 60 * 1000, "ko", "12개월 전");
testFormatRelativeTime(-365 * 24 * 60 * 60 * 1000, "ko", "1년 전");
testFormatRelativeTime(-53 * 365 * 24 * 60 * 60 * 1000, "ko", "53년 전");
testFormatRelativeTime(-1000 * 365 * 24 * 60 * 60 * 1000, "ko", "1,000년 전");
testFormatRelativeTime(-1000000 * 365 * 24 * 60 * 60 * 1000, "ko", "1,000,000년 전");

function testFormatRelativeTime(delta: number, lang: string, expected: string) {
  test(`${delta}->${expected}`, () => {
    expect(formatRelativeTime(Date.now() + delta, lang)).toBe(expected);
  });
}

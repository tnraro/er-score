import { MatchingMode } from "$lib/er-score";

export function Lmode(matchingMode: MatchingMode) {
  switch (matchingMode) {
    case MatchingMode.Normal:
      return "일반";
    case MatchingMode.Rank:
      return "랭크";
    case MatchingMode.Cobalt:
      return "코발트";
    default:
      return matchingMode as unknown as string;
  }
}

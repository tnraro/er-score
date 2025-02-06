import { MatchingMode } from "$lib/features/er-api/shapes";

export function Lrank(matchingMode: MatchingMode) {
  switch (matchingMode) {
    case MatchingMode.Normal:
    case MatchingMode.Rank:
      return "순위";
    case MatchingMode.Cobalt:
      return "승패";
    default:
      return matchingMode as unknown as string;
  }
}
